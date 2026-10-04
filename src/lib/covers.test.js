import { describe, expect, it } from 'vitest';
import { coverImage, isAllowedCover, thumbnailUrl } from './covers';

describe('covers', () => {
  it('turns a video id or link into its thumbnail', () => {
    expect(thumbnailUrl('QkrIZBLZEXw')).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(thumbnailUrl('https://www.youtube.com/watch?v=QkrIZBLZEXw')).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(thumbnailUrl('not a video')).toBeNull();
  });

  it('uses the stored cover, else the first lesson with a YouTube video', () => {
    expect(coverImage('https://x.public.blob.vercel-storage.com/c.jpg', ['https://youtu.be/QkrIZBLZEXw'])).toBe('https://x.public.blob.vercel-storage.com/c.jpg');
    expect(coverImage(null, ['nope', 'https://youtu.be/QkrIZBLZEXw'])).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(coverImage(null, [])).toBeNull();
  });

  it('only allows hosts next/image can load', () => {
    expect(isAllowedCover('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg')).toBe(true);
    expect(isAllowedCover('https://abc.public.blob.vercel-storage.com/covers/x.jpg')).toBe(true);
    expect(isAllowedCover('http://i.ytimg.com/vi/x/hqdefault.jpg')).toBe(false);
    expect(isAllowedCover('https://evil.example/x.jpg')).toBe(false);
    expect(isAllowedCover('data:image/png;base64,AAAA')).toBe(false);
  });
});
