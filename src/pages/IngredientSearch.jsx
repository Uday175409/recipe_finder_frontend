import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { findRecipesByIngredients } from '../services/recipeApi';

const IngredientSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await findRecipesByIngredients({
        ingredients: ingredients.trim(),
        number: 12,
        ranking: 1
      });
      setRecipes(response.data || []);
    } catch (err) {
      setError('Failed to find recipes with these ingredients');
      console.error('Error finding recipes by ingredients:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setIngredients('');
    setRecipes([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Find Recipes by Ingredients</h1>
        <p className="lead text-muted">
          Enter the ingredients you have, and we'll find recipes you can make!
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Ingredients</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter ingredients separated by commas (e.g., chicken, tomatoes, onions, garlic)"
                  />
                  <div className="form-text">
                    <i className="fas fa-info-circle me-1"></i>
                    Separate multiple ingredients with commas. The more ingredients you add, the more recipe options you'll get!
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-grow-1"
                    disabled={!ingredients.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Finding Recipes...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Find Recipes
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={clearSearch}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="text-center py-5">
          <i className="fas fa-apple-alt fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Ready to Cook?</h4>
          <p className="text-muted">
            List the ingredients you have available, and we'll suggest recipes you can make right now!
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Searching for recipes with your ingredients...</p>
        </div>
      )}

      {hasSearched && !loading && recipes.length === 0 && !error && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No Recipes Found</h4>
          <p className="text-muted">
            Try using different ingredients or check your spelling.
          </p>
        </div>
      )}

      {recipes.length > 0 && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Recipes You Can Make</h3>
            <span className="badge bg-primary fs-6">
              {recipes.length} recipes found
            </span>
          </div>
          <div className="row g-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-6 col-lg-4">
                <RecipeCard recipe={recipe} showNutrition={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSearch;