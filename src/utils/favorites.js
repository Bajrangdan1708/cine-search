const STORAGE_KEY = 'cinestream_favorites';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(movie) {
  const current = getFavorites();
  const exists = current.find((m) => m.id === movie.id);
  let updated;
  if (exists) {
    updated = current.filter((m) => m.id !== movie.id);
  } else {
    updated = [...current, movie];
  }
  saveFavorites(updated);
  return updated;
}

export function isFavorite(movieId) {
  return getFavorites().some((m) => m.id === movieId);
}

