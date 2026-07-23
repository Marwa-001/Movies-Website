// Curated thematic "collections" shown on the Collections pages. These map
// to TMDB company/keyword/genre ids inside lib/tmdb-server.js#getThematicCollection.
export const COLLECTION_THEMES = [
  "Marvel",
  "DC",
  // "Star Wars",
  "The Nun",
  "Insidious",
  "Musicals",
  "Harry Potter",
  "John Wick",
  "Godzilla",
];

export function slugifyTheme(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

/** Recovers the nice display name ("John Wick") from a URL slug ("johnwick"). */
export function findThemeBySlug(slug) {
  return COLLECTION_THEMES.find((theme) => slugifyTheme(theme) === slug) || slug;
}
