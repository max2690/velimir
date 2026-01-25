const cache = new Map<string, { count: number; expires: number }>();

export function rateLimit(ip: string, limit: number = 3, windowMs: number = 60000) {
  const now = Date.now();
  const entry = cache.get(ip);

  if (!entry || now > entry.expires) {
    cache.set(ip, { count: 1, expires: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
