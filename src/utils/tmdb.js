import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY;
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: API_KEY },
});

export async function fetchPopularMovies(page = 1) {
  const { data } = await tmdb.get('/movie/popular', {
    params: { page },
  });
  return data;
}

export async function searchMovies(query, page = 1) {
  if (!query.trim()) return { results: [], total_pages: 0, page: 1 };
  const { data } = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return data;
}

