import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold"
      : "text-gray-700 hover:text-blue-600 font-semibold";

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
            {user && user.role === 'employer' ? (
              <>
                <Link to="/employer/dashboard" className={isActive("/employer/dashboard")}>Dashboard</Link>
                <Link to="/employer/postjob" className={isActive("/employer/postjob")}>Post Job</Link>
                <Link to="/employer/managejobs" className={isActive("/employer/managejobs")}>My Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/" className={isActive("/")}>Home</Link>
                <Link to="/companies" className={isActive("/companies")}>Companies</Link>
                <Link to="/about" className={isActive("/about")}>About</Link>
              </>
            )}
          </div>

          {/* Vertical separator */}
          <div className="h-6 border-l border-gray-300"></div>

          {/* Right side login/auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-700 hover:text-blue-600 transition" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Welcome, <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                  <hr className="border-gray-200 my-1" />
                  {user.role === 'employer' && (
                    <Link
                      to="/post-job"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Post a Job
                    </Link>
                  )}
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              )}
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
            {user && user.role === 'employer' ? (
              <>
                <Link to="/employer/dashboard" className={isActive("/employer/dashboard")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/employer/postjob" className={isActive("/employer/postjob")} onClick={() => setMenuOpen(false)}>Post Job</Link>
                <Link to="/employer/managejobs" className={isActive("/employer/managejobs")} onClick={() => setMenuOpen(false)}>My Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/companies" className={isActive("/companies")} onClick={() => setMenuOpen(false)}>Companies</Link>
                <Link to="/about" className={isActive("/about")} onClick={() => setMenuOpen(false)}>About</Link>
              </>
            )}

            <hr className="border-gray-300 my-2" />

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
                <Link
                  to="/edit-profile"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Edit Profile
                </Link>
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
