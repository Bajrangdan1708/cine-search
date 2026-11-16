# CineStream

A movie discovery web application built with React and Vite, consuming the TMDB API.

## Features

- Browse popular movies in a responsive CSS Grid
- Search movies with debounced input (500ms delay)
- Infinite scroll using IntersectionObserver
- Save favorites to localStorage with persistence across reloads
- AI Mood Matcher powered by Google Gemini
- Lazy-loaded poster images
- Privacy Policy and Terms pages
- Dark, minimal UI

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and add your API keys:
   ```
   cp .env.example .env
   ```
3. Get a free TMDB API key at [developer.themoviedb.org](https://developer.themoviedb.org)
4. (Optional) Get a Gemini API key at [aistudio.google.com](https://aistudio.google.com) for the Mood Matcher
5. Install dependencies and start the dev server:
   ```
   npm install
   npm run dev
   ```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_KEY` | Yes | TMDB API v3 key |
| `VITE_GEMINI_KEY` | No | Google Gemini API key for Mood Matcher |

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `VITE_TMDB_KEY` and `VITE_GEMINI_KEY` as environment variables in the Vercel dashboard
4. Deploy

## Tech Stack

- React 19
- React Router 7
- Vite 6
- Axios
- TMDB API
- Google Gemini API (optional)

## Project Structure

```
src/
  components/    # Reusable UI components
    Header       # Sticky navigation
    Footer       # Site footer with legal links
    MovieCard    # Individual movie card with poster, title, year, rating, favorite
    MovieGrid    # CSS Grid layout for cards
    SearchBar    # Debounced search input
    MoodMatcher  # AI-powered mood-to-movie search
  hooks/         # Custom React hooks
    useDebounce  # 500ms debounce for search input
    useInfiniteScroll  # IntersectionObserver-based scroll loading
  pages/         # Route-level page components
    Home         # Main discover page
    Favorites    # Saved favorites from localStorage
    Privacy      # Privacy policy
    Terms        # Terms and conditions
  utils/         # API and storage utilities
    tmdb.js      # TMDB API client
    gemini.js    # Gemini API client
    favorites.js # localStorage read/write
```

