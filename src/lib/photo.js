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

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The format from the file's first bytes. sharp would also open AVIF, HEIC, SVG, TIFF and
// more, and those parsers are where image library bugs turn up, so anything else never
// reaches it.
export function sniffFormat(input) {
  if (!Buffer.isBuffer(input) || input.length < 12) return null;
  if (input[0] === 0xff && input[1] === 0xd8 && input[2] === 0xff) return 'jpeg';
  if (input.subarray(0, 8).equals(PNG)) return 'png';
  if (input.toString('latin1', 0, 4) === 'RIFF' && input.toString('latin1', 8, 12) === 'WEBP') {
    return 'webp';
  }
  return null;
}

// Returns { buffer, ext, contentType }, or null if it isn't a JPEG, PNG or WebP image.
export async function cleanPhoto(input) {
  const sniffed = sniffFormat(input);
  if (!sniffed) return null;
  let format;
  try {
    ({ format } = await sharp(input, { limitInputPixels: MAX_PIXELS }).metadata());
  } catch {
    return null;
  }
  const out = format === sniffed ? OUTPUT[format] : null;
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
