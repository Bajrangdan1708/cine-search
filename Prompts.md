# Prompts.md - AI Debugging Sessions

## Session 1: Infinite Scroll Implementation

**Problem:** Needed to implement infinite scroll without heavy dependencies.

**Approach:** Used the native `IntersectionObserver` API. Created a custom `useInfiniteScroll` hook that attaches an observer to a sentinel `<div>` at the bottom of the movie grid. When the sentinel enters the viewport (with a 200px root margin for pre-fetching), the hook fires a callback that fetches the next page and appends results to existing state using the spread operator.

**Key Learning:** The dependency array in `useEffect` within the hook must include `onIntersect` and `enabled` to properly clean up and re-attach the observer when callbacks or conditions change. The observer is disconnected in the cleanup return to prevent memory leaks.

## Session 2: Debounce Utility

**Problem:** Each keystroke in the search bar was firing an API request, causing unnecessary network traffic.

**Approach:** Built a `useDebounce` custom hook using `useRef` to hold the timer ID and `useCallback` to return a stable debounced function. The timer delays execution by 500ms, clearing any previous timer on each new invocation. This ensures only one request fires after the user stops typing.

**Key Learning:** Using `useRef` instead of a state variable for the timer avoids re-renders on each keystroke. The cancel function is also returned for cleanup scenarios.

## Session 3: useEffect Infinite Loop Prevention

**Problem:** Initial implementation of `useEffect` for fetching popular movies was re-fetching on every render.

**Approach:** Used a `useRef` boolean (`initialLoadDone`) to gate the initial fetch. The effect checks `initialLoadDone.current` and only fetches on the first mount, then sets it to `true`. This is cleaner than relying solely on empty dependency arrays in StrictMode, where effects may run twice in development.

## Session 4: State Append for Pagination

**Problem:** Setting state with `setMovies(newData)` replaced the entire list on each page fetch.

**Approach:** Used the functional updater pattern: `setMovies(prev => [...prev, ...data.results])`. This ensures the previous state snapshot is preserved and new results are concatenated, not replaced. For page 1 (initial load or new search), a direct `setMovies(data.results)` is used instead.

## Session 5: Favorites Persistence with localStorage

**Problem:** Needed favorites to persist across page reloads without a backend.

**Approach:** Created a utility module (`favorites.js`) with pure functions for reading, writing, and toggling favorites in `localStorage`. The Favorites page initializes state with a lazy initializer (`useState(() => getFavorites())`) to read from storage only once on mount. The `toggleFavorite` function reads current state from storage, modifies it, and writes back atomically.

## Session 6: Gemini API Integration for Mood Matcher

**Problem:** Needed to convert a natural language mood description into a movie search.

**Approach:** Two-step pipeline: (1) Send the mood string to the Gemini API with a prompt constraining the response to a single plaintext movie title. (2) Take the returned title and pass it to the TMDB `/search/movie` endpoint. Error handling wraps both API calls, and the matched title is displayed to the user for transparency.

**Key Learning:** The prompt must be very specific ("Return ONLY the movie title as a plaintext string. No quotes, no explanation, no punctuation.") to get a clean, parseable response. The response path is `data.candidates[0].content.parts[0].text`.

