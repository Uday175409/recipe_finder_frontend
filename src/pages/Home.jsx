import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  return (
    <div className="App">
      <section className="hero-section">
        <div className="hero-content">
          <div className="container-custom">
            <h1 className="hero-title">
              Discover Amazing Recipes
            </h1>
            <p className="hero-subtitle">
              Find delicious recipes, plan your meals, and discover perfect wine pairings
            </p>
            <div className="hero-cta">
              <Link to="/search" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                <i className="fas fa-search me-2"></i>
                Start Searching
              </Link>
              <Link to="/random" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2rem', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'white', color: 'white' }}>
                <i className="fas fa-dice me-2"></i>
                Random Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="search-container">
            <h3 className="text-center mb-4">What would you like to cook today?</h3>
            <div className="search-form">
              <input type="text" className="search-input" placeholder="Search for recipes..." />
              <button className="search-btn">
                <i className="fas fa-search me-2"></i>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-gradient mb-3">Explore Our Features</h2>
            <p className="lead">Everything you need to make cooking easier and more enjoyable</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4 className="feature-title">Recipe Search</h4>
              <p className="feature-description">
                Search through thousands of recipes by name, ingredient, or cuisine.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-apple-alt"></i>
              </div>
              <h4 className="feature-title">Ingredient Based</h4>
              <p className="feature-description">
                Find recipes based on ingredients you already have.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h4 className="feature-title">Meal Planning</h4>
              <p className="feature-description">
                Plan your weekly meals and generate shopping lists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
