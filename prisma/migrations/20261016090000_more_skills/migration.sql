-- Skill categories for the new short skills: the most-searched learning topics on YouTube.
INSERT INTO "Skill" ("id", "name", "tier", "color", "order") VALUES
    ('piano', 'Piano & Keyboard', 'HAND', '#8E3B5E', 11),
    ('beauty', 'Beauty & Hair', 'HAND', '#A4508B', 12),
    ('chess', 'Chess', 'HAND', '#7A5C3E', 13),
    ('video-editing', 'Video Editing', 'SCREEN', '#B5306E', 14),
    ('design', 'Graphic Design', 'SCREEN', '#5E7F1E', 15),
    ('ai', 'AI Tools', 'SCREEN', '#2E7D4F', 16)
ON CONFLICT ("id") DO NOTHING;
