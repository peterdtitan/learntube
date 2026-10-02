'use client';

import React, { useCallback } from 'react';
import VideoPlayer from './VideoPlayer';

async function saveProgress(videoId, stoppedAt, completed) {
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, stoppedAt: Math.floor(stoppedAt), completed }),
    });
  } catch {
    // Best-effort — progress saving should never break playback.
  }
}

export default function LessonPlayer({ video, startAt, isSignedIn }) {
  const handleProgress = useCallback((time) => {
    if (!isSignedIn) return;
    saveProgress(video.id, time, false);
  }, [video.id, isSignedIn]);

  const handleComplete = useCallback(() => {
    if (!isSignedIn) return;
    saveProgress(video.id, video.duration, true);
  }, [video.id, video.duration, isSignedIn]);

  return (
    <VideoPlayer
      videoId={video.id}
      youtubeUrl={video.url}
      startAt={startAt}
      duration={video.duration}
      captionsLang={video.captionsLang}
      onProgress={handleProgress}
      onComplete={handleComplete}
    />
  );
}
