import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass-effect">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <img src="/logo1.jpg" alt="Outfit Recommender Logo" className="brand-image" />
            <div className="brand-text">
              <span className="brand-primary">Outfit</span>
              <span className="brand-secondary">Recommender</span>
            </div>
          </div>
        </Link>
        
        <div className="navbar-nav">
          {currentUser ? (
            <>
              <div className="nav-items">
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                >
                  <span className="material-icons nav-icon">person</span>
                  <span className="nav-text">Profile</span>
                </Link>
                <Link 
                  to="/body-type" 
                  className={`nav-link ${isActive('/body-type') ? 'active' : ''}`}
                >
                  <span className="material-icons nav-icon">straighten</span>
                  <span className="nav-text">Body Type</span>
                </Link>
                <Link 
                  to="/skin-tone" 
                  className={`nav-link ${isActive('/skin-tone') ? 'active' : ''}`}
                >
                  <span className="material-icons nav-icon">palette</span>
                  <span className="nav-text">Skin Tone</span>
                </Link>
                <Link 
                  to="/recommendations" 
                  className={`nav-link ${isActive('/recommendations') ? 'active' : ''}`}
                >
                  <span className="material-icons nav-icon">style</span>
                  <span className="nav-text">Recommendations</span>
                </Link>
              </div>
              
              <div className="user-menu">
                <div className="user-greeting">
                  <span className="material-icons user-icon">account_circle</span>
                  <span className="user-name">Hi, {currentUser.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  <span className="material-icons">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link 
                to="/login" 
                className={`btn-nav ${isActive('/login') ? 'active' : ''}`}
              >
                <span className="material-icons">login</span>
                Log In
              </Link>
              <Link 
                to="/register" 
                className="btn-nav btn-nav-primary"
              >
                <span className="material-icons">person_add</span>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;