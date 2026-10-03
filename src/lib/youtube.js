// Accepts a raw YouTube video ID or a full YouTube URL and returns the video ID.
export function getYouTubeId(value) {
  if (!value) return null;
  if (!value.includes('/') && !value.includes('.')) return value;

  try {
    const url = new URL(value);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.slice(1);
    }
    if (url.searchParams.get('v')) {
      return url.searchParams.get('v');
    }
    const embedMatch = url.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
  } catch {
    return value;
  }

  return value;
}

export function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// Strict version for admin input: the 11-character video id, or null if the text isn't a
// YouTube video link or id. Handles watch?v=, youtu.be/, /embed/, /shorts/ and /live/.
export function parseYouTubeId(value) {
  const text = (value || '').trim();
  if (VIDEO_ID.test(text)) return text;
  let url;
  try {
    url = new URL(text);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m|music)\./, '');
  let id = null;
  if (host === 'youtu.be') [, id] = url.pathname.split('/');
  else if (['youtube.com', 'youtube-nocookie.com'].includes(host)) {
    id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] || null;
  }
  return id && VIDEO_ID.test(id) ? id : null;
}
