// Loads the YouTube IFrame Player API once per page. Browser only.
let apiPromise = null;

export default function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });

  return apiPromise;
}

// YouTube's privacy-enhanced mode: no YouTube cookies until the viewer presses play.
export const PLAYER_HOST = 'https://www.youtube-nocookie.com';
