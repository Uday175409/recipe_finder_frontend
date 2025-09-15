import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getRecipeById, 
  getRecipeNutrition, 
  getRecipePriceBreakdown,
  getRecipeInstructions,
  getSimilarRecipes 
} from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  const fetchRecipeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch recipe details
      const recipeResponse = await getRecipeById(id);
      setRecipe(recipeResponse.data);

      // Fetch additional data in parallel
      const [nutritionRes, priceRes, instructionsRes, similarRes] = await Promise.allSettled([
        getRecipeNutrition(id),
        getRecipePriceBreakdown(id),
        getRecipeInstructions(id),
        getSimilarRecipes(id, { number: 6 })
      ]);

      if (nutritionRes.status === 'fulfilled') {
        setNutrition(nutritionRes.value.data);
      }
      if (priceRes.status === 'fulfilled') {
        setPriceBreakdown(priceRes.value.data);
      }
      if (instructionsRes.status === 'fulfilled') {
        setInstructions(instructionsRes.value.data);
      }
      if (similarRes.status === 'fulfilled') {
        setSimilarRecipes(similarRes.value.data);
      }

    } catch (err) {
      setError('Failed to load recipe details');
      console.error('Error fetching recipe data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error || 'Recipe not found'}
          <div className="mt-3">
            <Link to="/search" className="btn btn-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderNutrients = () => {
    if (!nutrition || !nutrition.nutrients) return null;

    const mainNutrients = nutrition.nutrients.slice(0, 6);
    return (
      <div className="row g-3">
        {mainNutrients.map((nutrient, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card border-0 bg-light">
              <div className="card-body text-center">
                <h6 className="card-title">{nutrient.name}</h6>
                <p className="card-text fw-bold text-primary">
                  {Math.round(nutrient.amount)} {nutrient.unit}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderInstructions = () => {
    if (!instructions.length) return <p className="text-muted">No instructions available.</p>;

    return instructions.map((instructionGroup, groupIndex) => (
      <div key={groupIndex}>
        {instructionGroup.name && (
          <h5 className="text-primary mb-3">{instructionGroup.name}</h5>
        )}
        <div className="row g-3">
          {instructionGroup.steps?.map((step, stepIndex) => (
            <div key={stepIndex} className="col-12">
              <div className="card border-start border-primary border-4">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{width: '30px', height: '30px', fontSize: '14px'}}>
                      {step.number}
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">{step.step}</p>
                      {step.equipment?.length > 0 && (
                        <div className="mt-2">
                          <small className="text-muted">Equipment: </small>
                          {step.equipment.map((eq, eqIndex) => (
                            <span key={eqIndex} className="badge bg-secondary me-1">
                              {eq.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container py-4">
      {/* Recipe Header */}
      <div className="row mb-4">
        <div className="col-lg-6">
          <img
            src={recipe.image || 'https://via.placeholder.com/556x370?text=No+Image'}
            alt={recipe.title}
            className="img-fluid rounded-lg shadow"
          />
        </div>
        <div className="col-lg-6">
          <div className="ps-lg-4">
            <h1 className="display-5 fw-bold mb-3">{recipe.title}</h1>
            
            {recipe.summary && (
              <div 
                className="text-muted mb-4" 
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            )}

            <div className="row g-3 mb-4">
              {recipe.readyInMinutes && (
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                    <div className="fw-bold">{recipe.readyInMinutes} min</div>
                    <small className="text-muted">Cook Time</small>
                  </div>
                </div>
              )}
              {recipe.servings && (
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <i className="fas fa-users fa-2x text-success mb-2"></i>
                    <div className="fw-bold">{recipe.servings}</div>
                    <small className="text-muted">Servings</small>
                  </div>
                </div>
              )}
              {recipe.healthScore && (
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <i className="fas fa-heart fa-2x text-danger mb-2"></i>
                    <div className="fw-bold">{recipe.healthScore}</div>
                    <small className="text-muted">Health Score</small>
                  </div>
                </div>
              )}
              {priceBreakdown && (
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <i className="fas fa-dollar-sign fa-2x text-warning mb-2"></i>
                    <div className="fw-bold">${(priceBreakdown.totalCostPerServing / 100).toFixed(2)}</div>
                    <small className="text-muted">Per Serving</small>
                  </div>
                </div>
              )}
            </div>

            {(recipe.cuisines?.length > 0 || recipe.diets?.length > 0) && (
              <div className="mb-4">
                {recipe.cuisines?.map((cuisine, index) => (
                  <span key={index} className="badge bg-info text-dark me-2 mb-1">
                    {cuisine}
                  </span>
                ))}
                {recipe.diets?.map((diet, index) => (
                  <span key={index} className="badge bg-success me-2 mb-1">
                    {diet}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <ul className="nav nav-tabs nav-fill mb-4" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-list me-2"></i>Ingredients
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            <i className="fas fa-clipboard-list me-2"></i>Instructions
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            <i className="fas fa-chart-pie me-2"></i>Nutrition
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-lg-8">
              <h4 className="mb-3">Ingredients</h4>
              <div className="card">
                <div className="card-body">
                  {recipe.extendedIngredients?.length > 0 ? (
                    <ul className="list-unstyled">
                      {recipe.extendedIngredients.map((ingredient, index) => (
                        <li key={index} className="d-flex align-items-center mb-2">
                          <i className="fas fa-check text-success me-3"></i>
                          <span>{ingredient.original}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No ingredients available.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {priceBreakdown && (
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Cost Breakdown</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Cost:</span>
                      <span className="fw-bold">${(priceBreakdown.totalCost / 100).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Per Serving:</span>
                      <span className="fw-bold text-primary">${(priceBreakdown.totalCostPerServing / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div>
            <h4 className="mb-3">Cooking Instructions</h4>
            {renderInstructions()}
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div>
            <h4 className="mb-3">Nutrition Information</h4>
            {nutrition ? (
              <div>
                {nutrition.calories && (
                  <div className="alert alert-info text-center mb-4">
                    <h5 className="mb-0">
                      <i className="fas fa-fire me-2"></i>
                      {Math.round(nutrition.calories)} calories per serving
                    </h5>
                  </div>
                )}
                {renderNutrients()}
              </div>
            ) : (
              <p className="text-muted">Nutrition information not available.</p>
            )}
          </div>
        )}
      </div>

      {/* Similar Recipes */}
      {similarRecipes.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-4">Similar Recipes</h4>
          <div className="row g-4">
            {similarRecipes.slice(0, 3).map((similar) => (
              <div key={similar.id} className="col-md-4">
                <RecipeCard recipe={similar} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;