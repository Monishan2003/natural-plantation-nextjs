/**
 * Image-source guard. CMS image_url values may point at arbitrary hosts that
 * are not in next.config `remotePatterns` (which would throw at render). Only
 * trust our allowlisted hosts; otherwise fall back to a bundled local image.
 * Keep this list in sync with next.config `images.remotePatterns`.
 */
const ALLOWED_IMAGE_HOSTS = [
  "images.unsplash.com",
  "eqqczxgwrqlgrknhhjtf.supabase.co",
];

export function safeImage(
  url: string | null | undefined,
  fallback: string,
): string {
  if (!url) return fallback;
  if (url.startsWith("/")) return url; // local asset
  try {
    return ALLOWED_IMAGE_HOSTS.includes(new URL(url).hostname) ? url : fallback;
  } catch {
    return fallback;
  }
}
