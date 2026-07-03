#!/usr/bin/env node
/**
 * migrate-photos.js
 * Copies tour photos from "Info Paquetes y Fotos/{Destination}/{TourFolder}/"
 * to "public/tours/{dest-slug}/{tour-slug}/" with sequential naming.
 * Generates scripts/tour-photos-map.json as a side-effect.
 *
 * NOTE: macOS uses NFD Unicode normalization for filenames.
 * We normalize all folder names to NFC before matching.
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'Info Paquetes y Fotos');
const DEST_DIR   = path.join(ROOT, 'public', 'tours');

// Normalize a string to NFC (standard form used in our code)
function nfc(str) { return str.normalize('NFC'); }

// ── Mapping: source folder name (NFC) → { destSlug, tourSlug }
const FOLDER_MAP = {
  // Lima
  'CIRCUITO MÁGICO DE AGUAS':                { dest: 'lima', slug: 'circuito-magico-de-aguas' },
  'CITY TOUR LIMA':                          { dest: 'lima', slug: 'city-tour-lima' },
  'ISLAS PALOMINO':                          { dest: 'lima', slug: 'islas-palomino' },
  'LÍNEAS DE NAZCA FULL DAY':                { dest: 'lima', slug: 'lineas-de-nazca-full-day' },
  'MUSEO LARCO':                             { dest: 'lima', slug: 'museo-larco' },
  'PARACAS, ICA & HUACACHINA FULL DAY':      { dest: 'lima', slug: 'paracas-ica-huacachina-full-day' },
  'SANTUARIO DE PACHACÁMAC':                 { dest: 'lima', slug: 'santuario-de-pachacamac' },
  'TOUR GASTRONÓMICO LIMA':                  { dest: 'lima', slug: 'tour-gastronomico-lima' },

  // Cusco
  '7 LAGUNAS DE AUSANGATE FULL DAY':                { dest: 'cusco', slug: '7-lagunas-de-ausangate-full-day' },
  'CITY TOUR CUSCO':                                { dest: 'cusco', slug: 'city-tour-cusco' },
  'CITY TOUR CUSCO EN REALIDAD VIRTUAL':            { dest: 'cusco', slug: 'city-tour-cusco-realidad-virtual' },
  'CUATRIMOTOS MARAS, MORAY, SALINERAS + ZIPLINE':  { dest: 'cusco', slug: 'cuatrimotos-maras-moray-salineras-zipline' },
  'CUATRIMOTOS MORADA DE LOS DIOSES':               { dest: 'cusco', slug: 'cuatrimotos-morada-de-los-dioses' },
  'GLACIAR QUELCCAYA FULL DAY':                     { dest: 'cusco', slug: 'glaciar-quelccaya-full-day' },
  'LAGUNA HUMANTAY':                                { dest: 'cusco', slug: 'laguna-humantay' },
  'MACHU PICCHU FULL DAY':                          { dest: 'cusco', slug: 'machu-picchu-full-day' },
  'MARAS, MORAY Y SALINERAS':                       { dest: 'cusco', slug: 'maras-moray-salineras' },
  'MATRIMONIO ANDINO O KASARAKUY Y PAGO A LA TIERRA': { dest: 'cusco', slug: 'matrimonio-andino-kasarakuy' },
  'MESALPATA O CCORIHUAYRACHINAMOCCO':              { dest: 'cusco', slug: 'mesalpata-ccorihuayrachinamocco' },
  'MIRABUS CUSCO':                                  { dest: 'cusco', slug: 'mirabus-cusco' },
  'MONTAÑA DE COLORES (VINICUNCA)':                 { dest: 'cusco', slug: 'montana-de-colores-vinicunca' },
  'MONTAÑA DE COLORES ATV':                         { dest: 'cusco', slug: 'montana-de-colores-atv' },
  'MONTAÑA PALLAY PUNCHU':                          { dest: 'cusco', slug: 'montana-pallay-punchu' },
  'PACHAMANCA FULL DAY':                            { dest: 'cusco', slug: 'pachamanca-full-day' },
  'PALCOYO – MONTAÑA DE COLORES ALTERNATIVA':       { dest: 'cusco', slug: 'palcoyo-montana-de-colores-alternativa' },
  'QUESWACHACA FULL DAY':                           { dest: 'cusco', slug: 'queswachaca-full-day' },
  'TALLER TORITOS DE PUCARÁ':                       { dest: 'cusco', slug: 'taller-toritos-de-pucara' },
  'TOUR BUS 180° ESCÉNICO':                         { dest: 'cusco', slug: 'tour-bus-180-escenico' },
  'TOUR MÍSTICO':                                   { dest: 'cusco', slug: 'tour-mistico' },
  'VALLE SAGRADO TRADICIONAL':                      { dest: 'cusco', slug: 'valle-sagrado-tradicional' },
  'VALLE SAGRADO VIP':                              { dest: 'cusco', slug: 'valle-sagrado-vip' },
  'VALLE SUR':                                      { dest: 'cusco', slug: 'valle-sur' },
  'WALKING TOUR CUSCO HISTÓRICO':                   { dest: 'cusco', slug: 'walking-tour-cusco-historico' },
  'WALKING TOUR CUSCO TRADICIONAL':                 { dest: 'cusco', slug: 'walking-tour-cusco-tradicional' },
  'WAQRAPUKARA':                                    { dest: 'cusco', slug: 'waqrapukara' },

  // Arequipa
  'CAÑÓN DEL COLCA 2 DÍAS  1 NOCHE':           { dest: 'arequipa', slug: 'canon-del-colca-2-dias-1-noche' },
  'CATARATA DE PILLONES':                       { dest: 'arequipa', slug: 'catarata-de-pillones' },
  'CITY TOUR AREQUIPA (HALF DAY)':              { dest: 'arequipa', slug: 'city-tour-arequipa-half-day' },
  'CITY TOUR AREQUIPA + YANAHUARA + CARMEN ALTO': { dest: 'arequipa', slug: 'city-tour-arequipa-yanahuara-carmen-alto' },
  'RAFTING RÍO CHILI (HALF DAY)':               { dest: 'arequipa', slug: 'rafting-rio-chili-half-day' },
  'RUTA DEL SILLAR (HALF DAY)':                 { dest: 'arequipa', slug: 'ruta-del-sillar-half-day' },
  'SALINAS Y AGUADA BLANCA  REPRESA DE UZUÑA':  { dest: 'arequipa', slug: 'salinas-aguada-blanca-represa-uzuna' },
  'SALINAS Y AGUADA BLANCA (HALF DAY)':         { dest: 'arequipa', slug: 'salinas-y-aguada-blanca-half-day' },
  'TOUR CAMPIÑA AREQUIPEÑA - MIRABÚS':          { dest: 'arequipa', slug: 'tour-campina-arequipena-mirabus' },
  'TREKKING CAÑÓN DEL COLCA 3 DÍAS  2 NOCHES': { dest: 'arequipa', slug: 'trekking-canon-del-colca-3-dias-2-noches' },
  'VALLE DE MAJES':                             { dest: 'arequipa', slug: 'valle-de-majes' },

  // Puno
  'ISLAS UROS HALF DAY':                        { dest: 'puno', slug: 'islas-uros-half-day' },
  'LODGE EN UROS 12 DÍA Y 1 NOCHE':            { dest: 'puno', slug: 'lodge-en-uros-1-dia-1-noche' },
  'PUNO FULL DAY – UROS & TAQUILE':             { dest: 'puno', slug: 'puno-full-day-uros-taquile' },
  'PUNO ISLAS UROS, AMANTANÍ Y TAQUILE 2D1N':  { dest: 'puno', slug: 'puno-islas-uros-amantani-taquile-2d1n' },
  'RUTA AYMARA FULL DAY':                       { dest: 'puno', slug: 'ruta-aymara-full-day' },
  'RUTA QUECHUA FULL DAY LAMPA, PUKARÁ Y TINAJANI': { dest: 'puno', slug: 'ruta-quechua-full-day-lampa-pukara-tinajani' },
  'SILLUSTANI HALF DAY':                        { dest: 'puno', slug: 'sillustani-half-day' },
};

// Build a NFC-keyed lookup (macOS filenames come back as NFD)
const FOLDER_MAP_NFC = {};
for (const [k, v] of Object.entries(FOLDER_MAP)) {
  FOLDER_MAP_NFC[nfc(k)] = v;
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort(); // alphabetical for determinism
}

function main() {
  ensureDir(DEST_DIR);

  const photoMap = {}; // { slug: ['/tours/lima/slug/01.jpg', ...] }
  let mapped = 0;
  let skipped = 0;

  const destinations = ['Lima', 'Cusco', 'Arequipa', 'Puno'];

  for (const destFolder of destinations) {
    const destPath = path.join(SOURCE_DIR, destFolder);
    if (!fs.existsSync(destPath)) {
      console.warn(`⚠️  Destination folder not found: ${destPath}`);
      continue;
    }

    const tourFolders = fs.readdirSync(destPath).filter(f =>
      fs.statSync(path.join(destPath, f)).isDirectory()
    );

    for (const rawTourFolder of tourFolders) {
      // Normalize to NFC for matching
      const tourFolderNFC = nfc(rawTourFolder);
      const mapping = FOLDER_MAP_NFC[tourFolderNFC];

      if (!mapping) {
        console.warn(`⚠️  No mapping for "${tourFolderNFC}" in ${destFolder}`);
        skipped++;
        continue;
      }

      const { dest, slug } = mapping;
      // Use rawTourFolder (NFD) for actual fs operations on macOS
      const srcDir  = path.join(destPath, rawTourFolder);
      const outDir  = path.join(DEST_DIR, dest, slug);
      ensureDir(outDir);

      const images = getImages(srcDir);
      if (images.length === 0) {
        console.warn(`⚠️  No images in: ${srcDir}`);
      }

      const paths = [];
      images.forEach((imgFile, idx) => {
        const ext     = path.extname(imgFile).toLowerCase().replace('.jpeg', '.jpg');
        const newName = String(idx + 1).padStart(2, '0') + ext;
        fs.copyFileSync(path.join(srcDir, imgFile), path.join(outDir, newName));
        paths.push(`/tours/${dest}/${slug}/${newName}`);
      });

      photoMap[slug] = paths;
      console.log(`✅  ${slug} — ${paths.length} photo(s)`);
      mapped++;
    }
  }

  // free-walking-tour-cusco-miradores: reuse first photo from walking-tour-cusco-historico
  if (photoMap['walking-tour-cusco-historico']?.length > 0) {
    photoMap['free-walking-tour-cusco-miradores'] = [photoMap['walking-tour-cusco-historico'][0]];
    console.log(`✅  free-walking-tour-cusco-miradores — reused first photo from walking-tour-cusco-historico`);
    mapped++;
  }

  // Write JSON map
  const mapPath = path.join(__dirname, 'tour-photos-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(photoMap, null, 2));
  console.log(`\n📄  Photo map → scripts/tour-photos-map.json`);
  console.log(`📊  Mapped: ${mapped} tours  |  Skipped: ${skipped} folders`);
}

main();
