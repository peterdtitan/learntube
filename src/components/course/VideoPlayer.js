'use client';

import React, {
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { getYouTubeId } from '../../lib/youtube';
import loadYouTubeApi, { PLAYER_HOST } from '../../lib/youtubeApi';

// Pausing, hiding the tab and leaving the page also save, so this only covers a crash.
// Every 15s keeps the busiest endpoint to a third of what 5s cost under load.
const PROGRESS_SAVE_INTERVAL_MS = 15000;
const LOOP_CHECK_MS = 200;
const COMPLETE_THRESHOLD = 0.92;
// Remembers that this browser has chosen to play YouTube videos (and so accepted YouTube's
// cookies); later lessons then load the player straight away.
const YOUTUBE_OK = 'learntube:youtube-ok';

function readYouTubeOk() {
  try {
    return window.localStorage.getItem(YOUTUBE_OK) === '1';
  } catch {
    return false;
  }
}

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
  // Nothing from YouTube loads (and it sets no cookies) until the learner presses play.
  const [active, setActive] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const autoplay = useRef(false);
  useEffect(() => {
    if (readYouTubeOk()) setActive(true);
  }, []);

  const activate = () => {
    try {
      window.localStorage.setItem(YOUTUBE_OK, '1');
    } catch {
      // Without storage, the next lesson just asks again.
    }
    autoplay.current = true;
    setActive(true);
  };

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
    if (!active) return undefined;
    let cancelled = false;
    completedRef.current = false;
    readyRef.current = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !YT || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        host: PLAYER_HOST,
        videoId: getYouTubeId(youtubeUrl),
        playerVars: {
          start: Math.max(0, Math.floor(startAt)),
          autoplay: autoplay.current ? 1 : 0,
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
            // The learner pressed our play button; don't make them press YouTube's too.
            if (autoplay.current) playerRef.current.playVideo();
            autoplay.current = false;
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
  }, [videoId, active]);

  useEffect(() => {
    if (readyRef.current) playerRef.current.setPlaybackRate(playbackRate);
  }, [playbackRate]);

  const youtubeId = getYouTubeId(youtubeUrl);
  return (
    <div data-testid="player" className="relative aspect-video w-full max-w-full overflow-hidden rounded-lg bg-black shadow-md">
      {active ? (
        <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      ) : (
        <button type="button" onClick={activate} className="group absolute inset-0 grid place-items-center text-white">
          {youtubeId && !thumbFailed && (
            <Image
              onError={() => setThumbFailed(true)}
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
          )}
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-accent text-on-accent shadow-lg transition-transform group-hover:scale-105">
            <Play size={28} fill="currentColor" aria-hidden="true" />
          </span>
          <span className="sr-only">Play the lesson video</span>
          <span className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-left text-xs">
            Plays from YouTube, which may set cookies once you press play.
          </span>
        </button>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
