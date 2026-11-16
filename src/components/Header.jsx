import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          CineStream
        </NavLink>
        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'header-link' + (isActive ? ' header-link--active' : '')
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              'header-link' + (isActive ? ' header-link--active' : '')
            }
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

