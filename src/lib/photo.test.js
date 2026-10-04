import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { cleanPhoto } from './photo';

const photo = (width, height, format = 'jpeg') => sharp({
  create: {
    width, height, channels: 3, background: '#c47a3d',
  },
})[format]();

describe('cleanPhoto', () => {
  it('removes EXIF such as where and when the photo was taken', async () => {
    const withExif = await photo(40, 30)
      .withExif({ IFD0: { Artist: 'Ada', Copyright: 'home', DateTime: '2026:10:04 09:00:00' } })
      .toBuffer();
    expect((await sharp(withExif).metadata()).exif).toBeDefined();

    const clean = await cleanPhoto(withExif);
    const meta = await sharp(clean.buffer).metadata();
    expect(meta.exif).toBeUndefined();
    expect(meta.xmp).toBeUndefined();
    expect(clean).toMatchObject({ ext: 'jpg', contentType: 'image/jpeg' });
  });

  it('turns sideways phone photos upright before dropping the orientation tag', async () => {
    const sideways = await photo(40, 30).withMetadata({ orientation: 6 }).toBuffer();
    const meta = await sharp((await cleanPhoto(sideways)).buffer).metadata();
    expect([meta.width, meta.height]).toEqual([30, 40]);
    expect(meta.orientation).toBeUndefined();
  });

  it('shrinks huge photos to 2000px on the long edge', async () => {
    const big = await photo(4000, 1000, 'png').toBuffer();
    const clean = await cleanPhoto(big);
    const meta = await sharp(clean.buffer).metadata();
    expect([meta.width, meta.height]).toEqual([2000, 500]);
    expect(clean.ext).toBe('png');
  });

  it('refuses files that only claim to be images', async () => {
    expect(await cleanPhoto(Buffer.from('<script>alert(1)</script>'))).toBeNull();
    expect(await cleanPhoto(await photo(10, 10, 'gif').toBuffer())).toBeNull();
  });
});
