import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">CineStream</span>
          <span className="footer-copy">
            Data provided by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              TMDB
            </a>
          </span>
        </div>
        <nav className="footer-right">
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer-link">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

