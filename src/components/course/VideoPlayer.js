'use client';

import React, {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react';
import { getYouTubeId } from '../../lib/youtube';
import loadYouTubeApi from '../../lib/youtubeApi';

// Pausing, hiding the tab and leaving the page also save, so this only covers a crash.
// Every 15s keeps the busiest endpoint to a third of what 5s cost under load.
const PROGRESS_SAVE_INTERVAL_MS = 15000;
const LOOP_CHECK_MS = 200;
const COMPLETE_THRESHOLD = 0.92;

// Wraps the YouTube IFrame API. The ref exposes getCurrentTime() and seekTo(seconds).
const VideoPlayer = forwardRef(({
  videoId, youtubeUrl, startAt = 0, captionsLang, duration, playbackRate = 1, loop,
  onProgress, onComplete,
}, ref) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const intervalRef = useRef(null);
  const completedRef = useRef(false);
  const callbacks = useRef({ onProgress, onComplete });
  callbacks.current = { onProgress, onComplete };
  const settings = useRef({ playbackRate, loop });
  settings.current = { playbackRate, loop };

  const currentTime = () => {
    const t = playerRef.current?.getCurrentTime?.();
    return typeof t === 'number' ? t : null;
  };

  useImperativeHandle(ref, () => ({
    getCurrentTime: currentTime,
    seekTo: (seconds) => {
      if (readyRef.current) playerRef.current.seekTo(Math.max(0, seconds), true);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    completedRef.current = false;
    readyRef.current = false;

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
          playsinline: 1,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current.setPlaybackRate(settings.current.playbackRate);
          },
          onStateChange: (event) => {
            const { PLAYING, PAUSED, ENDED } = YT.PlayerState;
            if (event.data === PLAYING) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                const t = currentTime();
                if (t !== null) callbacks.current.onProgress?.(t);
              }, PROGRESS_SAVE_INTERVAL_MS);
            } else if (event.data === PAUSED) {
              clearInterval(intervalRef.current);
              const t = currentTime();
              if (t !== null) callbacks.current.onProgress?.(t);
            } else if (event.data === ENDED) {
              clearInterval(intervalRef.current);
              const { loop: active } = settings.current;
              if (active) {
                playerRef.current.seekTo(active.start, true);
                playerRef.current.playVideo();
              } else if (!completedRef.current) {
                completedRef.current = true;
                callbacks.current.onComplete?.();
              }
            }
          },
        },
      });
    });

    // Loop enforcement runs independently of progress saving so it stays responsive.
    const loopTimer = setInterval(() => {
      const { loop: active } = settings.current;
      if (!active || !readyRef.current) return;
      const t = currentTime();
      if (t !== null && (t >= active.end || t < active.start - 1)) {
        playerRef.current.seekTo(active.start, true);
      }
    }, LOOP_CHECK_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;
      const t = currentTime();
      if (t === null) return;
      if (duration && t / duration >= COMPLETE_THRESHOLD && !completedRef.current) {
        completedRef.current = true;
        callbacks.current.onComplete?.();
      } else {
        callbacks.current.onProgress?.(t);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      clearInterval(loopTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalRef.current);
      const t = currentTime();
      if (t !== null) callbacks.current.onProgress?.(t);
      playerRef.current?.destroy?.();
      playerRef.current = null;
      readyRef.current = false;
    };
    // Re-create the player only when the lesson itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    if (readyRef.current) playerRef.current.setPlaybackRate(playbackRate);
  }, [playbackRate]);

  return (
    <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-lg bg-black shadow-md">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
