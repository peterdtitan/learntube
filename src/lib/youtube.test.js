import { describe, expect, it } from 'vitest';
import { formatDuration, parseYouTubeId } from './youtube';

describe('parseYouTubeId', () => {
  it('reads every common link shape', () => {
    const id = 'aqz-KE-bpKQ';
    [
      id,
      `https://www.youtube.com/watch?v=${id}`,
      `https://youtube.com/watch?v=${id}&t=42s`,
      `https://m.youtube.com/watch?v=${id}`,
      `https://youtu.be/${id}?si=abc`,
      `https://www.youtube.com/embed/${id}`,
      `https://www.youtube.com/shorts/${id}`,
      `https://www.youtube-nocookie.com/embed/${id}`,
    ].forEach((link) => expect(parseYouTubeId(link)).toBe(id));
  });
  it('rejects anything that is not a YouTube video', () => {
    [
      '',
      'hello',
      'https://vimeo.com/123456',
      'https://www.youtube.com/@channel',
      'https://evil.example/watch?v=aqz-KE-bpKQ',
      // eslint-disable-next-line no-script-url -- checking that it's rejected
      'javascript:alert(1)',
    ].forEach((link) => expect(parseYouTubeId(link)).toBeNull());
  });
});

describe('formatDuration', () => {
  it('formats minutes and hours', () => {
    expect(formatDuration(65)).toBe('1:05');
    expect(formatDuration(3725)).toBe('1:02:05');
  });
});
