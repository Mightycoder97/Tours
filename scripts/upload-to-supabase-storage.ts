/**
 * upload-to-supabase-storage.ts
 *
 * Uploads all photos from public/tours/ to Supabase Storage bucket "tour-images"
 * then updates each tour's image_url and images[] in the database.
 *
 * Run with: npx tsx scripts/upload-to-supabase-storage.ts
 *
 * Prerequisites:
 *   - .env.local must have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - Photos must already be in public/tours/ (run migrate-photos.js first if needed)
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL   = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET_NAME    = 'tour-images';
const TOURS_DIR      = path.resolve(__dirname, '../public/tours');

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ── helpers ────────────────────────────────────────────────────────────────────

function getMimeType(ext: string): string {
  const map: Record<string, string> = {
    jpg:  'image/jpeg',
    jpeg: 'image/jpeg',
    png:  'image/png',
    webp: 'image/webp',
    gif:  'image/gif',
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET_NAME);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024, // 10 MB
    });
    if (error) throw new Error(`Failed to create bucket: ${error.message}`);
    console.log(`✅ Bucket "${BUCKET_NAME}" created`);
  } else {
    console.log(`✅ Bucket "${BUCKET_NAME}" already exists`);
  }
}

function getPublicUrl(storagePath: string): string {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  return data.publicUrl;
}

// ── main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting upload to Supabase Storage...\n');

  // 1. Ensure bucket exists
  await ensureBucket();

  // 2. Walk public/tours and collect all image files
  const destinations = fs.readdirSync(TOURS_DIR).filter(d =>
    fs.statSync(path.join(TOURS_DIR, d)).isDirectory()
  );

  // Map: slug -> { dest, files: [storagePath] }
  const slugMap: Record<string, { dest: string; files: string[] }> = {};

  for (const dest of destinations) {
    const destDir = path.join(TOURS_DIR, dest);
    const tours = fs.readdirSync(destDir).filter(t =>
      fs.statSync(path.join(destDir, t)).isDirectory()
    );
    for (const slug of tours) {
      const tourDir = path.join(destDir, slug);
      const files = fs.readdirSync(tourDir)
        .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
        .sort();

      slugMap[slug] = { dest, files: [] };

      for (const file of files) {
        const localPath    = path.join(tourDir, file);
        const storagePath  = `${dest}/${slug}/${file}`;   // e.g. cusco/machu-picchu-full-day/01.jpg
        const ext          = file.split('.').pop() || 'jpg';
        const contentType  = getMimeType(ext);
        const fileBuffer   = fs.readFileSync(localPath);

        // Upload (upsert so it doesn't fail if file exists)
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, fileBuffer, { contentType, upsert: true });

        if (error) {
          console.warn(`  ⚠️  ${storagePath}: ${error.message}`);
        } else {
          const publicUrl = getPublicUrl(storagePath);
          slugMap[slug].files.push(publicUrl);
          process.stdout.write(`  ✅ ${storagePath}\n`);
        }
      }
    }
  }

  // 3. Update each tour in the DB
  console.log('\n📝 Updating tour image URLs in database...\n');

  let updated = 0;
  let notFound = 0;

  for (const [slug, { files }] of Object.entries(slugMap)) {
    if (files.length === 0) continue;

    const imageUrl = files[0];  // first photo = main image
    const images   = files;

    const { error } = await supabase
      .from('tours')
      .update({ image_url: imageUrl, images })
      .eq('slug', slug);

    if (error) {
      console.warn(`  ⚠️  ${slug}: ${error.message}`);
      notFound++;
    } else {
      console.log(`  ✅ ${slug} → ${files.length} photos`);
      updated++;
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   Tours updated: ${updated}`);
  console.log(`   Errors:        ${notFound}`);
  console.log(`\n📷 Images are now served from:`);
  console.log(`   ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
