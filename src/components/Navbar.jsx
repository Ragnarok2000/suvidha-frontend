import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const linkClass = (path) =>
    `hover:text-white transition duration-200 px-3 py-1 rounded ${
      location.pathname === path ? 'bg-white text-indigo-600 font-semibold' : 'text-white'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-white tracking-wide mb-2 md:mb-0">
          ✨ Suvidha AI 
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap space-x-4 text-sm items-center">
          <Link to="/" className={linkClass('/')}>
            🏠 Home
          </Link>
          <Link to="/summarizer" className={linkClass('/summarizer')}>
            📝 Summarizer
          </Link>
          <Link to="/history" className={linkClass('/history')}>
            📜 Summary History
          </Link>
          <Link to="/articles" className={linkClass('/articles')}>
            📚 Article History
          </Link>

          {isLoggedIn && username && (
            <span className="text-white font-medium">👤 {username}</span>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-200 transition duration-200"
            >
              🚪 Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={linkClass('/login')}>
                🔐 Login
              </Link>
              <Link to="/signup" className={linkClass('/signup')}>
                🆕 Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;