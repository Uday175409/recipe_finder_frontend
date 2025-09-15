import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrencySelector from './CurrencySelector';

const Navbar = () => {
  const location = useLocation();
  const [currencyKey, setCurrencyKey] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  const handleCurrencyChange = (newCurrency) => {
    setCurrencyKey(prev => prev + 1);
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: newCurrency }));
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };
  
  return (
    <nav className="custom-navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Brand */}
          <Link className="navbar-brand" to="/" onClick={closeNav}>
            <i className="fas fa-utensils me-2"></i>
            Recipe Finder
          </Link>
          
          {/* Desktop Navigation */}
          <div className="navbar-menu desktop-only">
            <Link 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              to="/"
              onClick={closeNav}
            >
              <i className="fas fa-home me-1"></i>Home
            </Link>
            <Link 
              className={`nav-link ${isActive('/search') ? 'active' : ''}`} 
              to="/search"
              onClick={closeNav}
            >
              <i className="fas fa-search me-1"></i>Search
            </Link>
            <Link 
              className={`nav-link ${isActive('/random') ? 'active' : ''}`} 
              to="/random"
              onClick={closeNav}
            >
              <i className="fas fa-dice me-1"></i>Random
            </Link>
            <Link 
              className={`nav-link ${isActive('/ingredients') ? 'active' : ''}`} 
              to="/ingredients"
              onClick={closeNav}
            >
              <i className="fas fa-apple-alt me-1"></i>Ingredients
            </Link>
            <Link 
              className={`nav-link ${isActive('/meal-planner') ? 'active' : ''}`} 
              to="/meal-planner"
              onClick={closeNav}
            >
              <i className="fas fa-calendar-alt me-1"></i>Planner
            </Link>
            <Link 
              className={`nav-link ${isActive('/wine-pairing') ? 'active' : ''}`} 
              to="/wine-pairing"
              onClick={closeNav}
            >
              <i className="fas fa-wine-glass me-1"></i>Wine
            </Link>
            <Link 
              className={`nav-link ${isActive('/settings') ? 'active' : ''}`} 
              to="/settings"
              onClick={closeNav}
            >
              <i className="fas fa-cog me-1"></i>Settings
            </Link>
          </div>
          
          {/* Currency Selector */}
          <div className="navbar-actions desktop-only">
            <CurrencySelector onCurrencyChange={handleCurrencyChange} key={currencyKey} />
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle mobile-only" 
            onClick={toggleNav}
          >
            <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isNavOpen && (
          <div className="mobile-menu mobile-only">
            <Link 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              to="/"
              onClick={closeNav}
            >
              <i className="fas fa-home me-2"></i>Home
            </Link>
            <Link 
              className={`nav-link ${isActive('/search') ? 'active' : ''}`} 
              to="/search"
              onClick={closeNav}
            >
              <i className="fas fa-search me-2"></i>Search Recipes
            </Link>
            <Link 
              className={`nav-link ${isActive('/random') ? 'active' : ''}`} 
              to="/random"
              onClick={closeNav}
            >
              <i className="fas fa-dice me-2"></i>Random Recipes
            </Link>
            <Link 
              className={`nav-link ${isActive('/ingredients') ? 'active' : ''}`} 
              to="/ingredients"
              onClick={closeNav}
            >
              <i className="fas fa-apple-alt me-2"></i>By Ingredients
            </Link>
            <Link 
              className={`nav-link ${isActive('/meal-planner') ? 'active' : ''}`} 
              to="/meal-planner"
              onClick={closeNav}
            >
              <i className="fas fa-calendar-alt me-2"></i>Meal Planner
            </Link>
            <Link 
              className={`nav-link ${isActive('/wine-pairing') ? 'active' : ''}`} 
              to="/wine-pairing"
              onClick={closeNav}
            >
              <i className="fas fa-wine-glass me-2"></i>Wine Pairing
            </Link>
            <Link 
              className={`nav-link ${isActive('/settings') ? 'active' : ''}`} 
              to="/settings"
              onClick={closeNav}
            >
              <i className="fas fa-cog me-2"></i>Settings
            </Link>
            <div className="mobile-currency">
              <CurrencySelector onCurrencyChange={handleCurrencyChange} key={`mobile-${currencyKey}`} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;