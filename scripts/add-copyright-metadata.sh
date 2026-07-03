#!/bin/bash
# add-copyright-metadata.sh
# Adds EXIF copyright metadata to all tour photos in public/tours/

set -e

TOURS_DIR="/Users/mightycoder/Documents/GitHub/Tours/public/tours"

# Check if exiftool is installed, install if needed
if ! command -v exiftool &> /dev/null; then
  echo "📦 Installing exiftool via Homebrew..."
  brew install exiftool
fi

echo "🔒 Adding EXIF copyright metadata to all tour photos..."
echo "📁 Directory: $TOURS_DIR"
echo ""

COUNT=0

find "$TOURS_DIR" \( -name '*.jpg' -o -name '*.jpeg' \) | while read img; do
  exiftool -overwrite_original \
    -Copyright='© 2025 Machu Picchu Travel Adventures. Todos los derechos reservados.' \
    -Artist='Machu Picchu Travel Adventures' \
    -CopyrightNotice='© 2025 Machu Picchu Travel Adventures' \
    -ImageDescription='Tour fotográfico - Machu Picchu Travel Adventures' \
    -XMP:Rights='© 2025 Machu Picchu Travel Adventures. Todos los derechos reservados.' \
    -XMP:UsageTerms='Uso exclusivo de Machu Picchu Travel Adventures. Prohibida su reproducción sin autorización.' \
    "$img" 2>/dev/null
  echo "  ✅ $(basename "$img")"
  COUNT=$((COUNT + 1))
done

echo ""
echo "✅ EXIF copyright metadata added to all photos in $TOURS_DIR"
