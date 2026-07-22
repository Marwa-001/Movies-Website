const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Sizes TMDB supports for posters/backdrops. Pick based on where the image
 * is rendered so we don't ship a giant image into a 208x296 card.
 */
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: "w185",
    card: "w342", // matches the 208x296 MovieCard nicely at 2x density
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
};

/**
 * Builds a full TMDB image URL from a raw path like "/abc123.jpg".
 * Returns a local fallback poster if no path is available so <Image> never breaks.
 */
export function getTmdbImageUrl(path, size = TMDB_IMAGE_SIZES.poster.card) {
  if (!path) return null; // fallback placeholder already in /public
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
