import React from 'react';
import Link from 'next/link';
import { formatDuration } from '../../lib/youtube';

function VideoRow({
  pathwayId, video, isActive, progress,
}) {
  const completed = Boolean(progress?.completed);

  let dotClassName = 'border-gray-400 text-transparent';
  if (completed) dotClassName = 'border-emerald-500 bg-emerald-500 text-white';
  else if (isActive) dotClassName = 'border-red-400 text-red-400';

  return (
    <Link
      href={`/pathways/${pathwayId}/learn/${video.id}`}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-red-400/10 text-red-500 font-semibold'
          : 'hover:bg-black/5 dark:hover:bg-white/10'
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${dotClassName}`}
      >
        {completed ? '✓' : '●'}
      </span>
      <span className="flex-1 truncate">{video.title}</span>
      <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{formatDuration(video.duration)}</span>
    </Link>
  );
}

export default function CourseSidebar({
  pathway,
  units,
  unassignedVideos,
  activeVideoId,
  progressByVideoId,
}) {
  const totalVideos = units.reduce((sum, u) => sum + u.videos.length, 0) + unassignedVideos.length;
  const completedCount = [
    ...units.flatMap((u) => u.videos),
    ...unassignedVideos,
  ].filter((v) => progressByVideoId[v.id]?.completed).length;
  const percent = totalVideos ? Math.round((completedCount / totalVideos) * 100) : 0;

  return (
    <nav className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg leading-tight">{pathway.title}</h2>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {completedCount}
          {' of '}
          {totalVideos}
          {' lessons complete'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {units.map((unit) => (
          <div key={unit.id}>
            <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {unit.title}
            </p>
            <div className="flex flex-col gap-1">
              {unit.videos.map((video) => (
                <VideoRow
                  key={video.id}
                  pathwayId={pathway.id}
                  video={video}
                  isActive={video.id === activeVideoId}
                  progress={progressByVideoId[video.id]}
                />
              ))}
            </div>
          </div>
        ))}

        {unassignedVideos.length > 0 && (
          <div className="flex flex-col gap-1">
            {unassignedVideos.map((video) => (
              <VideoRow
                key={video.id}
                pathwayId={pathway.id}
                video={video}
                isActive={video.id === activeVideoId}
                progress={progressByVideoId[video.id]}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
