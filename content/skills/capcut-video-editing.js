import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/capcut-video-editing.json';

// "How to edit on CapCut" tops YouTube's editing searches in both the US and Nigeria. Mostly
// Dee Nimmin's short phone tutorials, with full beginner walk-throughs from Metics Media,
// Matt Loui and Adekemi Isamotu.

export default {
  slug: 'skill-capcut-video-editing',
  title: 'Edit videos on your phone with CapCut',
  description: 'Cut clips, add music, captions and text, use transitions, and export a sharp video for TikTok, Instagram Reels, YouTube Shorts or WhatsApp. All in the free CapCut app.',
  makeTitle: 'A 30 to 60 second video you edited, with music, captions and a transition',
  skillId: 'video-editing',
  cover: 'P51CqlPOE_w',
  by: 'Dee Nimmin',
  videos,
  lessons: {
    P51CqlPOE_w: {
      title: 'CapCut for beginners',
      try: 'Install CapCut (free). Start a new project with three short clips from your phone, split one clip and delete the part you don’t want.',
      minutes: 20,
      questions: [
        q.single('Which tool cuts a clip into two at the playhead?', ['Split', 'Delete', 'Speed', 'Volume'], 0),
        q.single('The timeline shows…', ['Your clips in order, from left to right in time', 'Only the music', 'Your phone’s gallery', 'The export settings'], 0),
        q.tf('Dragging the edge of a clip in the timeline trims it shorter.', true),
      ],
    },
    xwia09aJLcU: {
      title: 'Basic tips and tricks',
      try: 'Use three tips from the video on your project: for example change the canvas to 9:16, adjust a clip’s speed, and add a filter.',
      minutes: 20,
      questions: [
        q.single('Which aspect ratio suits TikTok, Reels and Shorts?', ['9:16 (tall)', '16:9 (wide)', '1:1 (square)', '4:3'], 0),
        q.single('Speeding a clip up to 2× makes it…', ['Half as long', 'Twice as long', 'Louder', 'Higher resolution'], 0),
      ],
    },
    j5_471mO14c: {
      title: 'The full beginner’s editing guide',
      try: 'Edit a rough cut: put your clips in order, trim dead time from the start and end of each, and watch it through once without stopping.',
      minutes: 25,
      questions: [
        q.single('A “rough cut” is…', ['A first edit with clips in order, before polishing', 'The final export', 'A broken file', 'A blurry video'], 0),
        q.tf('Cutting the dead time at the start and end of each clip makes a video feel tighter.', true),
        q.single('An overlay (picture in picture) lets you…', ['Show one clip on top of another', 'Delete a clip', 'Export faster', 'Record your voice'], 0),
      ],
    },
    'yE-tMW8IL5s': {
      title: 'Add music',
      try: 'Add a music track under your video, lower its volume so voices stay clear, and fade it out at the end.',
      minutes: 15,
      questions: [
        q.single('Where does music sit in CapCut?', ['On its own audio track under the video', 'Inside the text', 'In the export settings', 'In a filter'], 0),
        q.tf('Using a popular song you don’t have the rights to can get your video muted or taken down.', true, 'Use CapCut’s licensed sounds or royalty-free music.'),
      ],
    },
    jxvM7z8vj3Q: {
      title: 'Automatic captions',
      try: 'Use Auto captions on a clip where you speak. Read through them, fix every mistake by hand, then pick a clear style.',
      minutes: 20,
      questions: [
        q.single('Why add captions?', ['Many people watch without sound, and captions help everyone follow', 'They make the file smaller', 'They replace the music', 'CapCut requires them'], 0),
        q.tf('You should always check automatic captions for mistakes.', true),
      ],
    },
    'r9BijRh-2VE': {
      title: 'The text-behind-a-person effect',
      try: 'Recreate the effect: add a title, duplicate your clip as an overlay, remove its background, and place the text between the two layers.',
      minutes: 20,
      questions: [
        q.single('Which feature cuts the person out of a clip for this effect?', ['Remove background (cutout)', 'Split', 'Speed', 'Volume'], 0),
        q.single('In CapCut, layers higher up in the timeline appear…', ['In front of the layers below', 'Behind everything', 'Only in the export', 'As audio'], 0),
      ],
    },
    '3yI1zfZSCec': {
      title: 'Easy transitions',
      try: 'Add one transition between two clips where the scene changes. Keep it short and subtle.',
      minutes: 10,
      questions: [
        q.single('Where do you add a transition?', ['At the join between two clips', 'Inside the music track', 'On the export screen', 'In the captions'], 0),
        q.tf('Using a different flashy transition between every clip usually makes a video look more professional.', false, 'A few simple cuts or one consistent transition look cleaner.'),
      ],
    },
    Zv9u0aLkfK0: {
      title: 'From beginner to pro',
      try: 'Add a keyframe zoom to one clip and a sound effect that matches an action. Watch the whole video back.',
      minutes: 25,
      questions: [
        q.single('A keyframe lets you…', ['Change a setting (like zoom or position) smoothly over time', 'Split a clip', 'Export in 4K', 'Add a filter to every clip'], 0),
        q.single('Two keyframes with different zoom levels create…', ['A smooth zoom between them', 'A cut', 'A new clip', 'Silence'], 0),
        q.tf('Sound effects that match actions on screen make an edit feel more polished.', true),
      ],
    },
    '5A-xJ1PwK3c': {
      title: 'Mistakes to stop making',
      try: 'Go through your project and fix any mistake from the video you find, such as audio that is too loud or text that is hard to read.',
      minutes: 20,
      questions: [
        q.single('Text on a busy background is easier to read with…', ['A shadow, outline or background box', 'A smaller font', 'More transitions', 'Lower contrast'], 0),
        q.tf('Background music should usually be quieter than speech.', true),
      ],
    },
    DgTJvcIl_N0: {
      title: 'Export settings for the best quality',
      try: 'Export your finished 30 to 60 second video at 1080p and 30 frames per second, then log it as your make.',
      minutes: 15,
      questions: [
        q.single('1080p describes a video’s…', ['Resolution (how many pixels tall)', 'Length', 'Frame rate', 'File type'], 0),
        q.single('Frame rate is…', ['How many still images play each second', 'How sharp each frame is', 'The video’s length', 'The music’s speed'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Find your way around CapCut',
      lessons: ['P51CqlPOE_w', 'xwia09aJLcU', 'j5_471mO14c'],
      checkpoint: exam('CapCut basics exam', [
        q.single('To remove the middle of a clip, you…', ['Split it twice and delete the middle piece', 'Speed it up', 'Add a transition', 'Mute it'], 0),
        q.single('The playhead is…', ['The line that marks where you are in the timeline', 'The first clip', 'The music track', 'The export button'], 0),
        q.single('A 16:9 canvas suits…', ['YouTube and TV-style wide videos', 'TikTok', 'Instagram Stories', 'WhatsApp status only'], 0),
        q.single('A 9:16 canvas suits…', ['TikTok, Reels, Shorts and Status', 'Widescreen films', 'Printed posters', 'Podcasts'], 0),
        q.tf('Pinching on the timeline zooms in so you can trim more precisely.', true),
        q.multi('Which can you change about a single clip?', ['Speed', 'Volume', 'Crop', 'Your phone’s camera'], [0, 1, 2]),
        q.single('Reversing a clip makes it…', ['Play backwards', 'Play twice', 'Silent', 'Wider'], 0),
        q.single('Filters mainly change a clip’s…', ['Colour and mood', 'Length', 'Speed', 'Sound'], 0),
        q.tf('Shooting more short clips than you need gives you more choice while editing.', true),
        q.order('Put a simple editing workflow in order.', ['Import your clips', 'Put them in order and trim', 'Add music and text', 'Polish with transitions and effects', 'Export']),
        q.single('Your video feels slow. What is the quickest fix?', ['Trim pauses and dead time from each clip', 'Add more filters', 'Make the text bigger', 'Lower the resolution'], 0),
        q.single('Picture in picture (overlay) is useful for…', ['Reaction videos or showing two things at once', 'Changing the frame rate', 'Captions', 'Exporting'], 0),
      ]),
    },
    {
      title: 'Music, captions and text',
      lessons: ['yE-tMW8IL5s', 'jxvM7z8vj3Q', 'r9BijRh-2VE'],
      checkpoint: exam('Sound and text exam', [
        q.single('“Ducking” or lowering music under speech helps…', ['Voices stay clear', 'The file get smaller', 'The video export faster', 'Colours look brighter'], 0),
        q.single('A fade-out on music…', ['Lowers the volume smoothly at the end', 'Cuts it suddenly', 'Speeds it up', 'Repeats it'], 0),
        q.tf('Royalty-free or CapCut library sounds reduce the risk of your video being muted.', true),
        q.single('Auto captions are generated from…', ['The speech in your clip', 'The music lyrics only', 'The video title', 'Your typing'], 0),
        q.multi('Which make captions easy to read?', ['High contrast with the background', 'A short line of text at a time', 'Tiny font at the very edge', 'An outline or shadow'], [0, 1, 3]),
        q.single('Where should captions sit on a TikTok or Reel?', ['In the middle-lower area, clear of the app’s buttons', 'At the very bottom edge', 'Off screen', 'In the top corner, under the clock'], 0),
        q.single('The text-behind-person effect needs…', ['The person cut out on a layer above the text', 'Two separate songs', 'A 16:9 canvas', 'A slow-motion clip'], 0),
        q.tf('Every text layer has its own start and end time in the timeline.', true),
        q.single('A voiceover is…', ['Narration you record over your video', 'A sound effect', 'A filter', 'An export setting'], 0),
        q.single('Your speech is hard to hear over the music. What should you do first?', ['Lower the music volume', 'Raise the music volume', 'Add a filter', 'Speed up the clip'], 0),
        q.order('Put the steps for adding captions in order.', ['Select the clip with speech', 'Run auto captions', 'Correct any mistakes', 'Choose a readable style']),
        q.single('Text animations (in, out and loop) control…', ['How text appears, leaves and moves', 'The music volume', 'The aspect ratio', 'The frame rate'], 0),
      ]),
    },
    {
      title: 'Transitions, polish and export',
      lessons: ['3yI1zfZSCec', 'Zv9u0aLkfK0', '5A-xJ1PwK3c', 'DgTJvcIl_N0'],
      checkpoint: exam('Polish and export exam', [
        q.single('A transition is added…', ['Between two clips', 'On the music track', 'To the export file', 'Inside a caption'], 0),
        q.single('Keyframes are used to…', ['Animate a change, like a zoom, over time', 'Delete clips', 'Add captions', 'Change the aspect ratio'], 0),
        q.single('Which export resolution is a good standard for social video?', ['1080p', '240p', '144p', '8K'], 0),
        q.single('30 frames per second means…', ['30 still images play each second', 'The video is 30 seconds long', 'It has 30 clips', 'It is 30 MB'], 0),
        q.tf('Higher resolution and frame rate make bigger files.', true),
        q.multi('Which are signs of a polished edit?', ['Clean audio levels', 'Readable text', 'Consistent, simple transitions', 'A different font in every clip'], [0, 1, 2]),
        q.single('A jump cut is…', ['A cut that jumps forward in time within the same shot', 'A transition with a spin', 'A sound effect', 'An export error'], 0),
        q.single('Why watch the whole video before exporting?', ['To catch mistakes like stray clips or loud music', 'It makes the export faster', 'CapCut requires it', 'To change the frame rate'], 0),
        q.tf('Exporting at the same frame rate you filmed at usually looks smoothest.', true),
        q.single('Your exported video looks blurry on YouTube. What is a likely cause?', ['It was exported at a low resolution', 'It has captions', 'It has music', 'It is too short'], 0),
        q.order('Put the final steps in order.', ['Watch it through', 'Fix mistakes', 'Choose export settings', 'Export and post']),
        q.single('A sound effect that matches an on-screen action is called…', ['Sound design', 'A filter', 'A keyframe', 'Colour grading'], 0),
      ]),
    },
  ],
};
