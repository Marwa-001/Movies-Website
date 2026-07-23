import { getTmdbImageUrl } from "@/lib/tmdb-image";
import { MOVIE_ID_TO_NAME, TV_ID_TO_NAME } from "@/lib/tmdb-genres";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Server-only secret. Falls back to the public var for local/dev convenience
// if someone only set NEXT_PUBLIC_TMDB_API_KEY, but production should set
// TMDB_API_KEY (no NEXT_PUBLIC_ prefix) so it's never bundled to the client.
const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function tmdbFetch(path, params = {}) {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB_API_KEY. Add it to your .env.local file to enable live TMDB data."
    );
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url.toString(), {
    // TMDB catalog data doesn't need to be refetched on every request
    next: { revalidate: 60 * 30 },
  });
  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status}): ${path}`);
  }
  return res.json();
}

function mapMovieToCard(movie, genreNameById) {
  return {
    id: String(movie.id),
    title: movie.title,
    imageSrc: getTmdbImageUrl(movie.poster_path),
    backdropSrc: getTmdbImageUrl(movie.backdrop_path, "original"),
    overview: movie.overview || "",
    voteAverage: movie.vote_average || 0,
    genres: (movie.genre_ids || []).map((id) => genreNameById[id]).filter(Boolean),
  };
}

function mapTvToCard(show, genreNameById) {
  return {
    id: String(show.id),
    title: show.name,
    imageSrc: getTmdbImageUrl(show.poster_path),
    genres: (show.genre_ids || []).map((id) => genreNameById[id]).filter(Boolean),
  };
}

export async function getTrending({ mediaType = "movie", timeWindow = "week" } = {}) {
  const data = await tmdbFetch(`/trending/${mediaType}/${timeWindow}`);
  const idMap = mediaType === "tv" ? TV_ID_TO_NAME : MOVIE_ID_TO_NAME;
  const mapper = mediaType === "tv" ? mapTvToCard : mapMovieToCard;
  return (data.results || []).map((item) => mapper(item, idMap));
}

export async function getMoviesByGenres({ genreIds = [], page = 1, year, query } = {}) {
  if (query) {
    const data = await tmdbFetch("/search/movie", { query, page, primary_release_year: year });
    return (data.results || []).map((item) => mapMovieToCard(item, MOVIE_ID_TO_NAME));
  }
  const data = genreIds.length
    ? await tmdbFetch("/discover/movie", {
        with_genres: genreIds.join(","),
        page,
        primary_release_year: year,
      })
    : await tmdbFetch("/movie/popular", { page });
  return (data.results || []).map((item) => mapMovieToCard(item, MOVIE_ID_TO_NAME));
}

export async function getSeriesByGenres({ genreIds = [], page = 1, year, query } = {}) {
  if (query) {
    const data = await tmdbFetch("/search/tv", { query, page, first_air_date_year: year });
    return (data.results || []).map((item) => mapTvToCard(item, TV_ID_TO_NAME));
  }
  const data = genreIds.length
    ? await tmdbFetch("/discover/tv", {
        with_genres: genreIds.join(","),
        page,
        first_air_date_year: year,
      })
    : await tmdbFetch("/tv/popular", { page });
  return (data.results || []).map((item) => mapTvToCard(item, TV_ID_TO_NAME));
}

export async function getPopularActors({ page = 1 } = {}) {
  const data = await tmdbFetch("/person/popular", { page });
  return (data.results || []).map((person) => ({
    id: String(person.id),
    name: person.name,
    imageSrc: getTmdbImageUrl(person.profile_path),
    knownFor: (person.known_for || []).map((k) => k.title || k.name).filter(Boolean),
  }));
}

/**
 * Full detail payload for the movie detail page: banner, gallery, cast,
 * director, genres, and a "Suggestion like ..." row (TMDB recommendations).
 */
export async function getMovieDetails(id) {
  const data = await tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,images,recommendations",
    include_image_language: "en,null",
  });

  const director = (data.credits?.crew || []).find((c) => c.job === "Director");
  const country = data.production_countries?.[0]?.name || null;
  const year = data.release_date ? data.release_date.slice(0, 4) : null;

  return {
    id: String(data.id),
    title: data.title,
    tagline: data.tagline || "",
    overview: data.overview || "",
    posterPath: data.poster_path || null,
    backdropPath: data.backdrop_path || null,
    posterUrl: getTmdbImageUrl(data.poster_path, "w500"),
    backdropUrl: getTmdbImageUrl(data.backdrop_path, "original"),
    year,
    country,
    isAdult: !!data.adult,
    runtime: data.runtime || null,
    voteAverage: data.vote_average || 0,
    genres: (data.genres || []).map((g) => g.name),
    gallery: (data.images?.backdrops || [])
      .slice(0, 6)
      .map((img) => getTmdbImageUrl(img.file_path, "w300")),
    cast: (data.credits?.cast || []).slice(0, 8).map((c) => ({
      id: String(c.id),
      name: c.name,
      character: c.character,
      photoUrl: getTmdbImageUrl(c.profile_path, "w185"),
    })),
    director: director
      ? { id: String(director.id), name: director.name, photoUrl: getTmdbImageUrl(director.profile_path, "w185") }
      : null,
    recommendations: (data.recommendations?.results || [])
      .slice(0, 6)
      .map((item) => mapMovieToCard(item, MOVIE_ID_TO_NAME)),
  };
}



/**
 * Fetches specific thematic groups for the Collections section
 * Marvel (Company 420), DC (Company 12892), Musicals (Genre 10402), 
 * John Wick (Keyword 236409), Godzilla (Keyword 156485)
 */
export async function getThematicCollection(type, mediaType = "movie") {
  const params = { page: 1, sort_by: "popularity.desc" };
  
  // Mapping keys to TMDB IDs
  const config = {
    musicals: { with_genres: "10402" },
    marvel: { with_companies: "420" },
    dc: { with_companies: "12892" },
    johnwick: { with_keywords: "236409" },
    godzilla: { with_keywords: "156485" },
    starwars: { with_keywords: "161181" },
    horror: { with_genres: "27" },
    action: { with_genres: "28" }
  };

  const cleanKey = type.toLowerCase().replace(/\s+/g, "");
  const queryParams = config[cleanKey] || {};
  
  // Dynamically switch between /discover/movie and /discover/tv
  const endpoint = mediaType === "series" || mediaType === "tv" ? "/discover/tv" : "/discover/movie";
  
  const data = await tmdbFetch(endpoint, { ...params, ...queryParams });
  
  return {
    title: type,
    // Representative image from the top result
    imageSrc: getTmdbImageUrl(data.results[0]?.poster_path, "w500"),
  };
}

const THEMATIC_CONFIG = {
  musicals: { with_genres: "10402" },
  marvel: { with_companies: "420" },
  dc: { with_companies: "12892" },
  johnwick: { with_keywords: "236409" },
  godzilla: { with_keywords: "156485" },
  starwars: { with_keywords: "161181" },
  horror: { with_genres: "27" },
  action: { with_genres: "28" },
};

/**
 * Full detail payload for a single collection page: hero backdrop + the
 * list of movies/series belonging to that theme, mapped to the same card
 * shape MovieCard already expects.
 */
export async function getThematicCollectionDetails(type, mediaType = "movie") {
  const cleanKey = type.toLowerCase().replace(/\s+/g, "");
  const queryParams = THEMATIC_CONFIG[cleanKey] || {};
  const isTv = mediaType === "series" || mediaType === "tv";
  const endpoint = isTv ? "/discover/tv" : "/discover/movie";

  const data = await tmdbFetch(endpoint, { page: 1, sort_by: "popularity.desc", ...queryParams });
  const idMap = isTv ? TV_ID_TO_NAME : MOVIE_ID_TO_NAME;
  const mapper = isTv ? mapTvToCard : mapMovieToCard;
  const results = data.results || [];

  return {
    title: type,
    imageSrc: getTmdbImageUrl(results[0]?.poster_path, "w500"),
    backdropSrc: getTmdbImageUrl(results[0]?.backdrop_path, "original"),
    items: results.slice(0, 10).map((r) => mapper(r, idMap)),
  };
}

/**
 * Fetches the best available YouTube trailer/teaser key for a movie or tv
 * show, straight from TMDB — never hardcoded.
 */
export async function getVideoKey(id, mediaType = "movie") {
  const endpoint = mediaType === "tv" ? `/tv/${id}/videos` : `/movie/${id}/videos`;
  const data = await tmdbFetch(endpoint);
  const results = data.results || [];

  const trailer =
    results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
    results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    results.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
    results.find((v) => v.site === "YouTube");

  return trailer ? trailer.key : null;
}

/**
 * Full detail payload for the series detail page: banner, gallery, cast,
 * creator, genres, and "Suggestion like ..." row (TMDB recommendations).
 */
export async function getSeriesDetails(id) {
  const data = await tmdbFetch(`/tv/${id}`, {
    append_to_response: "credits,images,recommendations",
    include_image_language: "en,null",
  });

  const creator = (data.created_by || [])[0];
  const country = data.origin_country?.[0] || null;
  const year = data.first_air_date ? data.first_air_date.slice(0, 4) : null;

  return {
    id: String(data.id),
    title: data.name,
    tagline: data.tagline || "",
    overview: data.overview || "",
    posterPath: data.poster_path || null,
    backdropPath: data.backdrop_path || null,
    posterUrl: getTmdbImageUrl(data.poster_path, "w500"),
    backdropUrl: getTmdbImageUrl(data.backdrop_path, "original"),
    year,
    country,
    isAdult: !!data.adult,
    numberOfSeasons: data.number_of_seasons || null,
    numberOfEpisodes: data.number_of_episodes || null,
    voteAverage: data.vote_average || 0,
    genres: (data.genres || []).map((g) => g.name),
    gallery: (data.images?.backdrops || [])
      .slice(0, 6)
      .map((img) => getTmdbImageUrl(img.file_path, "w300")),
    cast: (data.credits?.cast || []).slice(0, 8).map((c) => ({
      id: String(c.id),
      name: c.name,
      character: c.character,
      photoUrl: getTmdbImageUrl(c.profile_path, "w185"),
    })),
    creator: creator
      ? { id: String(creator.id), name: creator.name, photoUrl: getTmdbImageUrl(creator.profile_path, "w185") }
      : null,
    recommendations: (data.recommendations?.results || [])
      .slice(0, 6)
      .map((item) => mapTvToCard(item, TV_ID_TO_NAME)),
  };
}