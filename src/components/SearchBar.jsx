import { useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder }) {
  const handleSearch = useCallback(
    (value) => {
      onSearch(value);
    },
    [onSearch]
  );

  const [debouncedSearch] = useDebounce(handleSearch, 500);

  function handleChange(e) {
    debouncedSearch(e.target.value);
  }

  return (
    <div className="search-bar">
      <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        className="search-bar__input"
        type="text"
        placeholder={placeholder || 'Search movies...'}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}

