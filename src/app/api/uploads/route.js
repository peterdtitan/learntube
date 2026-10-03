import { put } from '@vercel/blob';
import { error, json, requireUserId } from '../../../lib/api';

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

// POST /api/uploads (multipart, field "file"): stores a make photo and returns its public URL.
export async function POST(req) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to upload a photo.');
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return error(503, 'Photo uploads aren’t set up yet. You can log your make without a photo.');
  }

  let form;
  try {
    form = await req.formData();
  } catch {
    return error(400, 'Send the photo as a file upload.');
  }
  const file = form.get('file');
  if (!file || typeof file === 'string') return error(400, 'Choose a photo to upload.');
  const ext = TYPES[file.type];
  if (!ext) return error(400, 'Photos must be JPEG, PNG or WebP.');
  if (file.size > MAX_BYTES) return error(400, 'Photos must be 8 MB or smaller.');

  const blob = await put(`makes/${userId}/photo.${ext}`, file, {
    access: 'public',
    addRandomSuffix: true,
    contentType: file.type,
  });
  return json({ url: blob.url }, 201);
}
