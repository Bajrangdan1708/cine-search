import './Privacy.css';

export default function Privacy() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: November 16, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          CineStream does not collect personal information. We do not require user accounts or logins.
          Your favorite movies are stored locally in your browser using localStorage and are never
          transmitted to any server.
        </p>

        <h2>2. Third-Party Services</h2>
        <p>
          This application uses the following third-party APIs:
        </p>
        <ul>
          <li>
            <strong>The Movie Database (TMDB)</strong> to fetch movie data and poster images.
            TMDB's privacy policy is available at{' '}
            <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">
              themoviedb.org/privacy-policy
            </a>.
          </li>
          <li>
            <strong>Google Gemini API</strong> (optional) for the Mood Matcher feature, which processes
            text prompts to suggest movie titles. No personal data is sent to this API.
          </li>
        </ul>

        <h2>3. Cookies</h2>
        <p>
          CineStream does not use cookies. Favorites data is stored via your browser's localStorage
          mechanism and remains entirely on your device.
        </p>

        <h2>4. Data Retention</h2>
        <p>
          Since we do not collect data, there is nothing to retain. Your localStorage data persists
          until you clear your browser data or remove items from your favorites.
        </p>

        <h2>5. Children's Privacy</h2>
        <p>
          This application is a general-purpose movie discovery tool. We do not knowingly collect
          information from children under 13.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be reflected on this page with
          an updated revision date.
        </p>

        <h2>7. Contact</h2>
        <p>
          For questions about this privacy policy, please open an issue on the project's GitHub repository.
        </p>
      </div>
    </main>
  );
}

