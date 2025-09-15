import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRandomRecipes } from '../services/recipeApi';

const RandomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { number: 12 };
      if (tags) params.tags = tags;
      
      const response = await getRandomRecipes(params);
      setRecipes(response.data.recipes || []);
    } catch (err) {
      setError('Failed to load random recipes');
      console.error('Error fetching random recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const tagOptions = [
    'vegetarian', 'vegan', 'gluten free', 'dairy free', 'healthy', 'quick',
    'easy', 'comfort food', 'spicy', 'sweet', 'savory', 'low carb'
  ];

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Random Recipe Discovery</h1>
        <p className="lead text-muted">
          Discover new and exciting recipes with every refresh!
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Filter by Tags</h5>
              <div className="mb-3">
                <select 
                  className="form-select"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                >
                  <option value="">Any Recipe</option>
                  {tagOptions.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={fetchRandomRecipes}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-dice me-2"></i>
                    Get Random Recipes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <button 
            className="btn btn-outline-primary ms-3"
            onClick={fetchRandomRecipes}
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Finding amazing recipes for you...</p>
        </div>
      ) : (
        <div className="row g-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-6 col-lg-4">
              <RecipeCard recipe={recipe} showPrice={true} />
            </div>
          ))}
        </div>
      )}

      {recipes.length === 0 && !loading && !error && (
        <div className="text-center py-5">
          <i className="fas fa-dice fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Ready to Discover?</h4>
          <p className="text-muted">
            Click the button above to get random recipe suggestions!
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomRecipes;