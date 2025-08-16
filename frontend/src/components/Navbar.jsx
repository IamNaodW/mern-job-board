import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData || userData === "undefined" || userData === "null") {
      setUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobBoard
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Left side links */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
              Home
            </Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600 font-semibold">
              Companies
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold">
              About
            </Link>
          </div>

          {/* Vertical separator */}
          <div className="h-6 border-l border-gray-300"></div>

          {/* Right side login/auth */}
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'employer' && (
                <Link
                  to="/post-job"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Post a Job
                </Link>
              )}
              <span className="font-medium text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {/* Left side links */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/companies"
              className="text-gray-700 hover:text-blue-600 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Companies
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <hr className="border-gray-300 my-2" />

            {/* Auth links */}
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/post-job"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Post a Job
                  </Link>
                )}
                <span className="font-medium text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-600 hover:text-red-800 font-semibold text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
