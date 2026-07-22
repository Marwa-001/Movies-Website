/**
 * Static name -> TMDB genre id maps, shared between the server-side TMDB
 * client (lib/tmdb-server.js) and anything on the client that needs to know
 * genre ids (e.g. displaying labels). Contains no secrets.
 */
export const MOVIE_GENRE_IDS = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Sci-Fi": 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const TV_GENRE_IDS = {
  Action: 10759,
  Adventure: 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 10765,
  Mystery: 9648,
  Romance: 10766,
  "Sci-Fi": 10765,
  Thriller: 9648,
  War: 10768,
};

function invert(map) {
  return Object.fromEntries(Object.entries(map).map(([name, id]) => [id, name]));
}

export const MOVIE_ID_TO_NAME = invert(MOVIE_GENRE_IDS);
export const TV_ID_TO_NAME = invert(TV_GENRE_IDS);
