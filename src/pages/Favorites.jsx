import { useState, useCallback } from 'react';
import { getFavorites } from '../utils/favorites';
import MovieGrid from '../components/MovieGrid';
import './Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  const handleFavoritesChange = useCallback((updated) => {
    setFavorites(updated);
  }, []);

  return (
    <main className="favorites">
      <div className="favorites-inner">
        <h1 className="favorites-title">Favorites</h1>
        {favorites.length === 0 ? (
          <p className="favorites-empty">
            No favorites yet. Browse movies and tap the heart icon to save them here.
          </p>
        ) : (
          <>
            <p className="favorites-count">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
            </p>
            <MovieGrid
              movies={favorites}
              onFavoritesChange={handleFavoritesChange}
            />
          </>
        )}
      </div>
    </main>
  );
}

