const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_REPOS = [
  '/Users/mightycoder/Documents/GitHub/Tours',
  '/Users/mightycoder/Documents/GitHub/Sonqo',
];

const TARGET_FILES = [
  'public/imagenes/hero-machupicchu-1.png',
  'public/imagenes/reforestation.png',
  'public/tours/arequipa/tour-campina-arequipena-mirabus/01.jpg',
  'public/tours/arequipa/tour-campina-arequipena-mirabus/02.jpg',
  'public/tours/cusco/maras-moray-salineras/03.png',
  'public/tours/cusco/matrimonio-andino-kasarakuy/07.png',
  'public/tours/cusco/mirabus-cusco/01.png',
  'public/tours/cusco/montana-de-colores-vinicunca/03.png',
  'public/tours/cusco/palcoyo-montana-de-colores-alternativa/01.png',
  'public/tours/cusco/tour-mistico/03.png',
  'public/tours/cusco/tour-mistico/04.png',
  'public/tours/cusco/waqrapukara/02.png',
  'public/tours/lima/lineas-de-nazca-full-day/03.png',
  'public/tours/lima/lineas-de-nazca-full-day/04.png',
  'public/tours/lima/lineas-de-nazca-full-day/05.png',
  'public/tours/lima/lineas-de-nazca-full-day/06.png',
];

async function optimizeImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  const initialStat = fs.statSync(filePath);
  const initialSizeMB = (initialStat.size / 1024 / 1024).toFixed(2);
  const meta = await sharp(filePath).metadata();

  let maxDim = meta.format === 'jpeg' ? 1600 : 1200;
  let quality = 80;
  let finalBuffer = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    let pipeline = sharp(filePath);
    if (meta.width > maxDim || meta.height > maxDim) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? maxDim : undefined,
        height: meta.height > meta.width ? maxDim : undefined,
        withoutEnlargement: true,
      });
    }

    if (meta.format === 'jpeg') {
      finalBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    } else {
      finalBuffer = await pipeline
        .png({
          quality,
          compressionLevel: 9,
          palette: true,
          colours: 256,
        })
        .toBuffer();
    }

    if (finalBuffer.length < 1024 * 1024) {
      break;
    }
    // If still >= 1MB, reduce dimension slightly and retry
    maxDim = Math.round(maxDim * 0.9);
    quality = Math.max(65, quality - 5);
  }

  if (finalBuffer.length >= 1024 * 1024) {
    throw new Error(`Failed to compress ${filePath} below 1MB. Current: ${finalBuffer.length} bytes`);
  }

  // Atomic write
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, finalBuffer);
  fs.renameSync(tmpPath, filePath);

  const finalStat = fs.statSync(filePath);
  const finalSizeMB = (finalStat.size / 1024 / 1024).toFixed(2);
  console.log(`[OK] ${filePath}: ${initialSizeMB}MB -> ${finalSizeMB}MB (<1MB)`);
}

async function main() {
  for (const repo of TARGET_REPOS) {
    console.log(`\n=== Processing repo: ${repo} ===`);
    for (const relFile of TARGET_FILES) {
      const fullPath = path.join(repo, relFile);
      await optimizeImage(fullPath);
    }
  }
  console.log('\nAll images successfully optimized below 1MB!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
