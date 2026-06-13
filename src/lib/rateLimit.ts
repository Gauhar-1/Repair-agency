interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

export function checkRateLimit(ip: string, maxAttempts = 5, windowMinutes = 15): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  let info = rateLimits.get(ip);
  
  if (!info || info.resetTime < now) {
    info = { count: 1, resetTime: now + windowMs };
    rateLimits.set(ip, info);
    return true;
  }
  
  info.count += 1;
  rateLimits.set(ip, info);
  
  return info.count <= maxAttempts;
}

export function resetRateLimit(ip: string) {
  rateLimits.delete(ip);
}
