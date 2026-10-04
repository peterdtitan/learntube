import { put } from '@vercel/blob';
import { error, json, requireUserId } from '../../../lib/api';
import { rateLimit } from '../../../lib/rateLimit';
import { cleanPhoto } from '../../../lib/photo';

const MAX_BYTES = 8 * 1024 * 1024;

// POST /api/uploads (multipart, field "file"): stores a make photo and returns its public URL.
// The stored copy is re-encoded with its location and other metadata removed.
export async function POST(req) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to upload a photo.');
  const limited = await rateLimit('upload', userId);
  if (limited) return limited;
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
  if (file.size > MAX_BYTES) return error(400, 'Photos must be 8 MB or smaller.');

  // The browser's stated type isn't trusted; sharp reads the actual file.
  const photo = await cleanPhoto(Buffer.from(await file.arrayBuffer()));
  if (!photo) return error(400, 'Photos must be JPEG, PNG or WebP.');

  const blob = await put(`makes/${userId}/photo.${photo.ext}`, photo.buffer, {
    access: 'public',
    addRandomSuffix: true,
    contentType: photo.contentType,
  });
  return json({ url: blob.url }, 201);
}
