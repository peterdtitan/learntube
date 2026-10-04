import sharp from 'sharp';

// Make photos are public, and phone photos carry EXIF: GPS position, camera, time taken.
// Re-encoding drops all of it (sharp keeps no metadata unless asked), turns the image
// upright first, caps its size, and proves the file really is an image.

const MAX_EDGE = 2000;
const MAX_PIXELS = 50 * 1000 * 1000; // refuses decompression bombs

const OUTPUT = {
  jpeg: { ext: 'jpg', contentType: 'image/jpeg', encode: (img) => img.jpeg({ quality: 82, mozjpeg: true }) },
  png: { ext: 'png', contentType: 'image/png', encode: (img) => img.png({ compressionLevel: 9 }) },
  webp: { ext: 'webp', contentType: 'image/webp', encode: (img) => img.webp({ quality: 82 }) },
};

// Returns { buffer, ext, contentType }, or null if it isn't a JPEG, PNG or WebP image.
export async function cleanPhoto(input) {
  let format;
  try {
    ({ format } = await sharp(input, { limitInputPixels: MAX_PIXELS }).metadata());
  } catch {
    return null;
  }
  const out = OUTPUT[format];
  if (!out) return null;
  const image = sharp(input, { limitInputPixels: MAX_PIXELS })
    .rotate()
    .resize({
      width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true,
    });
  try {
    const buffer = await out.encode(image).toBuffer();
    return { buffer, ext: out.ext, contentType: out.contentType };
  } catch {
    return null;
  }
}

export default cleanPhoto;
