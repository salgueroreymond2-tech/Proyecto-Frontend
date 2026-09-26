const DEFAULT_TTL_MS = 60_000;

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export async function getCachedJson<T>(key: string, request: () => Promise<T>, ttlMs = DEFAULT_TTL_MS): Promise<T> {
  const cached = cache.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const value = await request();
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}
