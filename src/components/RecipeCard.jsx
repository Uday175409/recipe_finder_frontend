import React from 'react';
import { Link } from 'react-router-dom';
import PriceDisplay from './PriceDisplay';

const RecipeCard = ({ recipe, showPrice = false, showNutrition = false }) => {
  const {
    id,
    title,
    image,
    readyInMinutes,
    servings,
    healthScore,
    spoonacularScore,
    pricePerServing,
    cuisines = [],
    diets = [],
    summary
  } = recipe;

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    const cleanText = text.replace(/<[^>]*>/g, '');
    return cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;
  };

  return (
    <div className="recipe-card">
      <div className="position-relative">
        <img
          src={image || 'https://via.placeholder.com/312x231?text=No+Image'}
          className="recipe-card-image"
          alt={title}
        />
        
        <div className="recipe-card-overlay">
          <div>
            <i className="fas fa-eye fa-2x mb-2"></i>
            <div>View Recipe</div>
          </div>
        </div>

        <div className="position-absolute top-0 end-0 m-3">
          {healthScore && (
            <span className="recipe-card-badge mb-2 d-block">
              <i className="fas fa-heart me-1"></i>
              Health: {healthScore}
            </span>
          )}
          {showPrice && pricePerServing && (
            <span className="recipe-card-badge" style={{ background: 'var(--accent-color)', color: 'var(--gray-800)' }}>
              <PriceDisplay 
                usdPrice={pricePerServing / 100} 
                showContext={true}
                size="small"
              />
            </span>
          )}
        </div>
      </div>
      
      <div className="recipe-card-content">
        <h3 className="recipe-card-title" title={title}>
          {title}
        </h3>
        
        <div className="recipe-card-meta">
          <div className="d-flex align-items-center gap-3">
            {readyInMinutes && (
              <span className="d-flex align-items-center gap-1">
                <i className="fas fa-clock text-primary"></i>
                <small>{readyInMinutes} min</small>
              </span>
            )}
            {servings && (
              <span className="d-flex align-items-center gap-1">
                <i className="fas fa-users text-secondary"></i>
                <small>{servings} servings</small>
              </span>
            )}
          </div>
          {spoonacularScore && (
            <div className="d-flex align-items-center gap-1">
              <i className="fas fa-star text-warning"></i>
              <small className="fw-bold">{Math.round(spoonacularScore)}/100</small>
            </div>
          )}
        </div>

        {(diets.length > 0 || cuisines.length > 0) && (
          <div className="mb-3">
            {diets.slice(0, 2).map((diet, index) => (
              <span 
                key={index} 
                className="badge me-1 mb-1"
                style={{ 
                  background: 'var(--secondary-color)', 
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              >
                {diet}
              </span>
            ))}
            {cuisines.slice(0, 1).map((cuisine, index) => (
              <span 
                key={index} 
                className="badge me-1 mb-1"
                style={{ 
                  background: 'var(--primary-color)', 
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {summary && (
          <p className="text-muted small mb-3" style={{ lineHeight: 1.5 }}>
            {truncateText(summary, 80)}
          </p>
        )}

        <div className="mt-auto">
          <Link 
            to={`/recipe/${id}`} 
            className="btn btn-primary w-100"
            style={{
              background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
              border: 'none',
              padding: '0.75rem 1rem',
              fontWeight: '600',
              borderRadius: 'var(--border-radius-md)'
            }}
          >
            <i className="fas fa-utensils me-2"></i>
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
