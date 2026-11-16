import { useState } from 'react';
import { getMoodMovie } from '../utils/gemini';
import { searchMovies } from '../utils/tmdb';
import './MoodMatcher.css';

export default function MoodMatcher({ onResults, onLoading }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [matchedTitle, setMatchedTitle] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || submitting) return;

    setError(null);
    setMatchedTitle(null);
    setSubmitting(true);
    if (onLoading) onLoading(true);

    try {
      const title = await getMoodMovie(input.trim());
      setMatchedTitle(title);
      const data = await searchMovies(title, 1);
      onResults(data.results, title);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
      if (onLoading) onLoading(false);
    }
  }

  return (
    <div className="mood-matcher">
      <form className="mood-matcher__form" onSubmit={handleSubmit}>
        <input
          className="mood-matcher__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Try: "I feel adventurous and want something sci-fi"'
          disabled={submitting}
        />
        <button
          className="mood-matcher__btn"
          type="submit"
          disabled={submitting || !input.trim()}
        >
          {submitting ? 'Thinking...' : 'Match'}
        </button>
      </form>
      {matchedTitle && (
        <p className="mood-matcher__result">
          AI suggested: <strong>{matchedTitle}</strong>
        </p>
      )}
      {error && <p className="mood-matcher__error">{error}</p>}
    </div>
  );
}

