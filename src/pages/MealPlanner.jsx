import React, { useState } from 'react';
import { generateMealPlan } from '../services/recipeApi';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState({
    timeFrame: 'day',
    targetCalories: '',
    diet: '',
    exclude: ''
  });

  const dietOptions = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cleanPreferences = Object.fromEntries(
        Object.entries(preferences).filter(([_, value]) => value !== '')
      );
      
      const response = await generateMealPlan(cleanPreferences);
      setMealPlan(response.data);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error('Error generating meal plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderMealPlan = () => {
    if (!mealPlan) return null;

    if (preferences.timeFrame === 'day') {
      return (
        <div className="row g-4">
          {['breakfast', 'lunch', 'dinner'].map((mealType) => {
            const meal = mealPlan.meals?.find(m => 
              m.title?.toLowerCase().includes(mealType) || 
              mealType === 'lunch' && m.title?.toLowerCase().includes('main')
            );
            
            return (
              <div key={mealType} className="col-lg-4">
                <div className="card h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0 text-capitalize">
                      <i className={`fas fa-${mealType === 'breakfast' ? 'coffee' : mealType === 'lunch' ? 'hamburger' : 'pizza-slice'} me-2`}></i>
                      {mealType}
                    </h5>
                  </div>
                  {meal ? (
                    <>
                      <img
                        src={meal.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        className="card-img-top"
                        alt={meal.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{meal.title}</h6>
                        <p className="text-muted small">Ready in: {meal.readyInMinutes || 'N/A'} minutes</p>
                        <p className="text-muted small">Servings: {meal.servings || 'N/A'}</p>
                        <a 
                          href={meal.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          View Recipe
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="card-body text-center text-muted">
                      <i className="fas fa-utensils fa-2x mb-3"></i>
                      <p>No meal suggestion available</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Weekly meal plan would be more complex
    return (
      <div className="alert alert-info text-center">
        <i className="fas fa-info-circle me-2"></i>
        Weekly meal plan feature coming soon!
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Meal Planner</h1>
        <p className="lead text-muted">
          Generate personalized meal plans based on your dietary preferences and goals
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-cog me-2"></i>
                Meal Plan Preferences
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={generatePlan}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Time Frame</label>
                  <select
                    className="form-select"
                    name="timeFrame"
                    value={preferences.timeFrame}
                    onChange={handleInputChange}
                  >
                    <option value="day">One Day</option>
                    <option value="week">One Week</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Target Calories (per day)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="targetCalories"
                    value={preferences.targetCalories}
                    onChange={handleInputChange}
                    placeholder="e.g., 2000"
                    min="1000"
                    max="5000"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Diet Type</label>
                  <select
                    className="form-select"
                    name="diet"
                    value={preferences.diet}
                    onChange={handleInputChange}
                  >
                    <option value="">No Specific Diet</option>
                    {dietOptions.map(diet => (
                      <option key={diet} value={diet}>{diet}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Exclude Ingredients</label>
                  <input
                    type="text"
                    className="form-control"
                    name="exclude"
                    value={preferences.exclude}
                    onChange={handleInputChange}
                    placeholder="e.g., nuts, shellfish, dairy"
                  />
                  <div className="form-text">
                    Separate multiple ingredients with commas
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic me-2"></i>
                      Generate Meal Plan
                    </>
                  )}
                </button>
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

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Creating your personalized meal plan...</p>
        </div>
      )}

      {mealPlan && !loading && (
        <div>
          <div className="text-center mb-4">
            <h3>Your Meal Plan</h3>
            {mealPlan.nutrients && (
              <div className="row g-3 justify-content-center">
                <div className="col-auto">
                  <span className="badge bg-primary fs-6">
                    {Math.round(mealPlan.nutrients.calories)} calories
                  </span>
                </div>
                <div className="col-auto">
                  <span className="badge bg-success fs-6">
                    {Math.round(mealPlan.nutrients.protein)}g protein
                  </span>
                </div>
                <div className="col-auto">
                  <span className="badge bg-info fs-6">
                    {Math.round(mealPlan.nutrients.carbohydrates)}g carbs
                  </span>
                </div>
                <div className="col-auto">
                  <span className="badge bg-warning fs-6">
                    {Math.round(mealPlan.nutrients.fat)}g fat
                  </span>
                </div>
              </div>
            )}
          </div>
          {renderMealPlan()}
        </div>
      )}

      {!mealPlan && !loading && (
        <div className="text-center py-5">
          <i className="fas fa-calendar-alt fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Ready to Plan Your Meals?</h4>
          <p className="text-muted">
            Set your preferences above and generate a personalized meal plan!
          </p>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;