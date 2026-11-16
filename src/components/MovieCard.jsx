import { IMG_BASE } from '../utils/tmdb';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { useState } from 'react';
import './MovieCard.css';

const FALLBACK_POSTER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" fill="%23222"><rect width="300" height="450"/><text x="150" y="225" text-anchor="middle" fill="%23555" font-family="Arial" font-size="16">No Poster</text></svg>'
);

export default function MovieCard({ movie, onFavoritesChange }) {
  const [fav, setFav] = useState(isFavorite(movie.id));
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const posterSrc = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : FALLBACK_POSTER;

  function handleFavorite(e) {
    e.stopPropagation();
    const updated = toggleFavorite(movie);
    setFav(!fav);
    if (onFavoritesChange) onFavoritesChange(updated);
  }

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
        />
        <button
          className={'movie-card__fav' + (fav ? ' movie-card__fav--active' : '')}
          onClick={handleFavorite}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          title={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? '#e50914' : 'none'} stroke={fav ? '#e50914' : '#fff'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{year}</span>
          <span className="movie-card__rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating}
          </span>
        </div>
      </div>
    </article>
  );
}

