import './Privacy.css';

export default function Terms() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <h1>Terms and Conditions</h1>
        <p className="legal-updated">Last updated: November 16, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using CineStream, you agree to be bound by these terms and conditions.
          If you do not agree, please do not use the application.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          CineStream is a movie discovery web application that displays movie data sourced from
          The Movie Database (TMDB). It provides search, browsing, and favoriting functionality.
        </p>

        <h2>3. Use of Content</h2>
        <p>
          All movie data, including titles, descriptions, ratings, and poster images, is provided
          by TMDB under their API terms of use. CineStream does not claim ownership of this content.
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>

        <h2>4. Disclaimer</h2>
        <p>
          The application is provided "as is" without warranties of any kind, express or implied.
          We do not guarantee the accuracy, completeness, or reliability of any movie data displayed.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          CineStream and its maintainers shall not be held liable for any damages arising from the
          use or inability to use this application.
        </p>

        <h2>6. API Usage</h2>
        <p>
          Users must comply with TMDB's API terms of use when interacting with data provided through
          this application. Rate limiting and usage restrictions may apply.
        </p>

        <h2>7. Modifications</h2>
        <p>
          We reserve the right to modify or discontinue the application at any time without notice.
          Updated terms will be posted on this page.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with applicable laws, without
          regard to conflict of law provisions.
        </p>
      </div>
    </main>
  );
}

