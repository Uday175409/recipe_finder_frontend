import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/recipeApi';

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [filters, setFilters] = useState({
    query: '',
    cuisine: '',
    diet: '',
    intolerances: '',
    type: '',
    maxReadyTime: '',
    maxCalories: '',
    minCalories: ''
  });

  const cuisineOptions = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];

  const dietOptions = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'
  ];

  const intoleranceOptions = [
    'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame',
    'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
  ];

  const typeOptions = [
    'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread',
    'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood',
    'snack', 'drink'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!filters.query.trim()) return;
    
    console.log('=== FRONTEND COMPONENT DEBUG - handleSearch START ===');
    console.log('Search triggered with filters:', filters);
    
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      
      console.log('Clean filters to send:', cleanFilters);
      
      const response = await searchRecipes(cleanFilters);
      console.log('Search response received:', response);
      setRecipes(response.data.results || []);
      console.log('=== FRONTEND COMPONENT DEBUG - handleSearch SUCCESS ===');
    } catch (err) {
      console.log('=== FRONTEND COMPONENT DEBUG - handleSearch ERROR ===');
      console.log('Search error in component:', err);
      console.log('Error details:', err.response?.data);
      console.log('Error status:', err.response?.status);
      console.log('=== FRONTEND COMPONENT DEBUG - handleSearch ERROR END ===');
      setError('Failed to search recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      cuisine: '',
      diet: '',
      intolerances: '',
      type: '',
      maxReadyTime: '',
      maxCalories: '',
      minCalories: ''
    });
    setRecipes([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2"></i>
                Search Filters
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSearch}>
                {/* Search Query */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Search Recipe</label>
                  <input
                    type="text"
                    className="form-control"
                    name="query"
                    value={filters.query}
                    onChange={handleInputChange}
                    placeholder="e.g., pasta, chicken, pizza..."
                  />
                </div>

                {/* Cuisine */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Cuisine</label>
                  <select
                    className="form-select"
                    name="cuisine"
                    value={filters.cuisine}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Cuisine</option>
                    {cuisineOptions.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                {/* Diet */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Diet</label>
                  <select
                    className="form-select"
                    name="diet"
                    value={filters.diet}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Diet</option>
                    {dietOptions.map(diet => (
                      <option key={diet} value={diet}>{diet}</option>
                    ))}
                  </select>
                </div>

                {/* Intolerances */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Avoid</label>
                  <select
                    className="form-select"
                    name="intolerances"
                    value={filters.intolerances}
                    onChange={handleInputChange}
                  >
                    <option value="">No Restrictions</option>
                    {intoleranceOptions.map(intolerance => (
                      <option key={intolerance} value={intolerance}>{intolerance}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Meal Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={filters.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Type</option>
                    {typeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Ready Time */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Max Cooking Time (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxReadyTime"
                    value={filters.maxReadyTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 30"
                    min="1"
                  />
                </div>

                {/* Calories Range */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Calories Range</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control"
                        name="minCalories"
                        value={filters.minCalories}
                        onChange={handleInputChange}
                        placeholder="Min"
                        min="1"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control"
                        name="maxCalories"
                        value={filters.maxCalories}
                        onChange={handleInputChange}
                        placeholder="Max"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!filters.query.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Search Recipes
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={clearFilters}
                  >
                    <i className="fas fa-times me-2"></i>
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-0">
              {hasSearched ? `Search Results` : 'Recipe Search'}
            </h2>
            {recipes.length > 0 && (
              <span className="badge bg-primary fs-6">
                {recipes.length} recipes found
              </span>
            )}
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {!hasSearched && !loading && (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">Start Your Recipe Search</h4>
              <p className="text-muted">
                Enter a recipe name or ingredient in the search box and use filters to find the perfect recipe.
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Searching for delicious recipes...</p>
            </div>
          )}

          {hasSearched && !loading && recipes.length === 0 && !error && (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No Recipes Found</h4>
              <p className="text-muted">
                Try adjusting your search criteria or removing some filters.
              </p>
            </div>
          )}

          {recipes.length > 0 && (
            <div className="row g-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="col-md-6 col-xl-4">
                  <RecipeCard recipe={recipe} showPrice={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;