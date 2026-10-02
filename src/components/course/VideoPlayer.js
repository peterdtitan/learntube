'use client';

import React, { useEffect, useRef } from 'react';
import { getYouTubeId } from '../../lib/youtube';

let apiPromise = null;

function loadYouTubeApi() {
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

const PROGRESS_SAVE_INTERVAL_MS = 5000;
const COMPLETE_THRESHOLD = 0.92;

export default function VideoPlayer({
  videoId, youtubeUrl, startAt = 0, captionsLang, duration, onProgress, onComplete,
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const completedRef = useRef(false);
  const onProgressRef = useRef(onProgress);
  const onCompleteRef = useRef(onComplete);

  onProgressRef.current = onProgress;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    completedRef.current = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !YT || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: getYouTubeId(youtubeUrl),
        playerVars: {
          start: Math.max(0, Math.floor(startAt)),
          cc_load_policy: 1,
          cc_lang_pref: captionsLang || 'en',
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            const { PLAYING, PAUSED, ENDED } = YT.PlayerState;
            if (event.data === PLAYING) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                const time = playerRef.current?.getCurrentTime?.();
                if (typeof time === 'number') onProgressRef.current?.(time);
              }, PROGRESS_SAVE_INTERVAL_MS);
            } else if (event.data === PAUSED) {
              clearInterval(intervalRef.current);
              const time = playerRef.current?.getCurrentTime?.();
              if (typeof time === 'number') onProgressRef.current?.(time);
            } else if (event.data === ENDED) {
              clearInterval(intervalRef.current);
              if (!completedRef.current) {
                completedRef.current = true;
                onCompleteRef.current?.();
              }
            }
          },
        },
      });
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const time = playerRef.current?.getCurrentTime?.();
        if (typeof time === 'number') {
          if (duration && time / duration >= COMPLETE_THRESHOLD && !completedRef.current) {
            completedRef.current = true;
            onCompleteRef.current?.();
          } else {
            onProgressRef.current?.(time);
          }
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalRef.current);
      const time = playerRef.current?.getCurrentTime?.();
      if (typeof time === 'number') onProgressRef.current?.(time);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
    // Re-create the player only when the lesson itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video shadow-md">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
