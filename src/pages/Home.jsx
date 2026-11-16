import { useState, useEffect, useCallback, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import MoodMatcher from '../components/MoodMatcher';
import MovieGrid from '../components/MovieGrid';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchPopularMovies, searchMovies } from '../utils/tmdb';
import './Home.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moodResults, setMoodResults] = useState(null);
  const [moodTitle, setMoodTitle] = useState(null);
  const [error, setError] = useState(null);
  const initialLoadDone = useRef(false);

  // Load popular movies on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    loadPopular(1);
  }, []);

  async function loadPopular(pg) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies(pg);
      if (pg === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setPage(pg);
    } catch {
      setError('Failed to load movies. Check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function loadSearch(query, pg) {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, pg);
      if (pg === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setPage(pg);
    } catch {
      setError('Search failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = useCallback((query) => {
    setMoodResults(null);
    setMoodTitle(null);
    setSearchQuery(query);
    if (query.trim()) {
      loadSearch(query, 1);
    } else {
      loadPopular(1);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loading || moodResults) return;
    const nextPage = page + 1;
    if (nextPage > totalPages) return;
    if (searchQuery.trim()) {
      loadSearch(searchQuery, nextPage);
    } else {
      loadPopular(nextPage);
    }
  }, [loading, page, totalPages, searchQuery, moodResults]);

  const hasMore = page < totalPages && !moodResults;
  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !loading);

  function handleMoodResults(results, title) {
    setMoodResults(results);
    setMoodTitle(title);
  }

  const displayMovies = moodResults || movies;

  return (
    <main className="home">
      <div className="home-inner">
        <section className="home-controls">
          <div className="home-search-section">
            <h2 className="home-section-label">Search</h2>
            <SearchBar onSearch={handleSearch} placeholder="Search by title..." />
          </div>
          <div className="home-mood-section">
            <h2 className="home-section-label">Mood Matcher</h2>
            <MoodMatcher onResults={handleMoodResults} />
          </div>
        </section>

        <section className="home-results">
          <div className="home-results-header">
            <h2 className="home-results-title">
              {moodTitle
                ? `Results for "${moodTitle}"`
                : searchQuery
                ? `Results for "${searchQuery}"`
                : 'Popular Movies'}
            </h2>
            {moodResults && (
              <button
                className="home-clear-btn"
                onClick={() => {
                  setMoodResults(null);
                  setMoodTitle(null);
                }}
              >
                Clear mood results
              </button>
            )}
          </div>

          {error && <p className="home-error">{error}</p>}

          <MovieGrid movies={displayMovies} />

          {loading && (
            <div className="home-loader">
              <div className="home-spinner" />
            </div>
          )}

          {displayMovies.length === 0 && !loading && !error && (
            <p className="home-empty">No movies found.</p>
          )}

          {/* Infinite scroll sentinel */}
          {hasMore && <div ref={sentinelRef} className="home-sentinel" />}
        </section>
      </div>
    </main>
  );
}

