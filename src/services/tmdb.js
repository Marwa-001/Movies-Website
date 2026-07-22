// Client-side data layer. All requests go to our own Next.js API routes
// (/api/tmdb/*), which hold the real TMDB API key server-side — see
// lib/tmdb-server.js. This file never touches the API key directly.

export { MOVIE_GENRE_IDS, TV_GENRE_IDS } from "@/lib/tmdb-genres";

async function getJson(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url.toString());
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status}): ${path}`);
  }
  return data;
}

export async function fetchTrending({ mediaType = "movie", timeWindow = "week" } = {}) {
  const data = await getJson("/api/tmdb/trending", { mediaType, timeWindow });
  return data.items || [];
}

export async function fetchMoviesByGenres({ genres = [], page = 1, year, query } = {}) {
  const data = await getJson("/api/tmdb/movies", { genres: genres.join(","), page, year, query });
  return data.items || [];
}

export async function fetchSeriesByGenres({ genres = [], page = 1, year, query } = {}) {
  const data = await getJson("/api/tmdb/series", { genres: genres.join(","), page, year, query });
  return data.items || [];
}

export async function fetchPopularActors({ page = 1 } = {}) {
  const data = await getJson("/api/tmdb/actors", { page });
  return data.items || [];
}

export async function fetchMovieDetails(id) {
  const data = await getJson(`/api/tmdb/movie/${id}`);
  return data.movie || null;
}
