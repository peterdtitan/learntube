import { del } from '@vercel/blob';

// Best effort: remove make photos from Vercel Blob. Never blocks the caller,
// since a leftover file costs pennies but a failed account deletion doesn't.
export async function deletePhotos(urls) {
  const blobUrls = urls.filter((u) => typeof u === 'string' && u.includes('.blob.vercel-storage.com'));
  if (!blobUrls.length || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(blobUrls);
  } catch (err) {
    // eslint-disable-next-line no-console -- leftover files are harmless; log for cleanup
    console.error('Could not delete photos from Blob storage', err);
  }
}

export default deletePhotos;
