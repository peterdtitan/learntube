// Comma-separated emails that are made admins when they next sign in.
export function adminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user) {
  if (!user) return false;
  return user.role === 'ADMIN' || adminEmails().includes((user.email || '').toLowerCase());
}
