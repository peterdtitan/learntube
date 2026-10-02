'use client';

import React, { useState } from 'react';
import NotesPanel from './NotesPanel';

const TABS = ['Notes', 'Transcript', 'Code Sandbox'];

export default function LessonTabs({
  videoId, transcript, initialNote, isSignedIn,
}) {
  const [activeTab, setActiveTab] = useState('Notes');

  return (
    <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-red-400 text-red-500'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'Notes' && (
          <NotesPanel videoId={videoId} initialContent={initialNote} isSignedIn={isSignedIn} />
        )}

        {activeTab === 'Transcript' && (
          <div className="max-h-80 overflow-y-auto text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {transcript
              ? <p className="whitespace-pre-wrap">{transcript}</p>
              : <p className="text-gray-500 dark:text-gray-400">No transcript available for this lesson yet.</p>}
          </div>
        )}

        {activeTab === 'Code Sandbox' && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 py-10 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
            <p className="font-medium">Interactive code sandbox — coming soon</p>
            <p className="max-w-sm">
              We&apos;ll let you practice what you just watched right here for coding lessons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
