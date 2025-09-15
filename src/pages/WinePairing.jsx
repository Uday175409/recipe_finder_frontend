import React, { useState } from 'react';
import { getWinePairing } from '../services/recipeApi';

const WinePairing = () => {
  const [pairingResult, setPairingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    food: '',
    maxPrice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchWinePairing = async (e) => {
    e.preventDefault();
    if (!searchQuery.food.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const params = { food: searchQuery.food.trim() };
      if (searchQuery.maxPrice) {
        params.maxPrice = searchQuery.maxPrice;
      }

      const response = await getWinePairing(params);
      setPairingResult(response.data);
    } catch (err) {
      setError('Failed to find wine pairings. Please try again.');
      console.error('Error finding wine pairing:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery({ food: '', maxPrice: '' });
    setPairingResult(null);
    setError(null);
  };

  const renderWinePairing = () => {
    if (!pairingResult) return null;

    return (
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-wine text-white" style={{backgroundColor: '#722f37'}}>
              <h5 className="mb-0">
                <i className="fas fa-wine-glass me-2"></i>
                Wine Pairing for "{searchQuery.food}"
              </h5>
            </div>
            <div className="card-body">
              {pairingResult.pairingText ? (
                <p className="card-text">{pairingResult.pairingText}</p>
              ) : (
                <p className="text-muted">No specific pairing recommendation available.</p>
              )}

              {pairingResult.pairedWines && pairingResult.pairedWines.length > 0 && (
                <div>
                  <h6 className="mt-4 mb-3">Recommended Wines:</h6>
                  <div className="row g-3">
                    {pairingResult.pairedWines.map((wine, index) => (
                      <div key={index} className="col-md-6">
                        <div className="border p-3 rounded bg-light">
                          <h6 className="text-wine" style={{color: '#722f37'}}>{wine}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {pairingResult.productMatches && pairingResult.productMatches.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">Wine Suggestions</h6>
              </div>
              <div className="card-body">
                {pairingResult.productMatches.slice(0, 3).map((wine, index) => (
                  <div key={index} className="border-bottom pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                    <div className="d-flex">
                      {wine.imageUrl && (
                        <img
                          src={wine.imageUrl}
                          alt={wine.title}
                          className="me-3 rounded"
                          style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{wine.title}</h6>
                        {wine.price && (
                          <p className="text-success fw-bold mb-1">{wine.price}</p>
                        )}
                        {wine.averageRating && (
                          <div className="mb-2">
                            <span className="text-warning">
                              {'★'.repeat(Math.floor(wine.averageRating))}
                              {'☆'.repeat(5 - Math.floor(wine.averageRating))}
                            </span>
                            <small className="text-muted ms-1">
                              ({wine.averageRating})
                            </small>
                          </div>
                        )}
                        {wine.link && (
                          <a 
                            href={wine.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Wine Pairing Assistant</h1>
        <p className="lead text-muted">
          Discover the perfect wine pairings for your favorite dishes
        </p>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header" style={{backgroundColor: '#722f37', color: 'white'}}>
              <h5 className="mb-0">
                <i className="fas fa-search me-2"></i>
                Find Wine Pairing
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={searchWinePairing}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Food or Dish</label>
                  <input
                    type="text"
                    className="form-control"
                    name="food"
                    value={searchQuery.food}
                    onChange={handleInputChange}
                    placeholder="e.g., steak, salmon, pasta, chocolate cake"
                    required
                  />
                  <div className="form-text">
                    Enter a specific dish, main ingredient, or cuisine type
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Maximum Price (optional)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxPrice"
                    value={searchQuery.maxPrice}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="1"
                  />
                  <div className="form-text">
                    Set a budget limit for wine recommendations
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn flex-grow-1"
                    style={{backgroundColor: '#722f37', color: 'white'}}
                    disabled={!searchQuery.food.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Finding Pairings...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-wine-glass me-2"></i>
                        Find Wine Pairings
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

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border mb-3" style={{color: '#722f37'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Finding the perfect wine pairings...</p>
        </div>
      )}

      {pairingResult && !loading && renderWinePairing()}

      {!pairingResult && !loading && (
        <div className="text-center py-5">
          <i className="fas fa-wine-glass fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Ready to Find the Perfect Pairing?</h4>
          <p className="text-muted">
            Enter a dish or food item above to discover expertly curated wine recommendations!
          </p>
          
          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <i className="fas fa-utensils fa-2x mb-3" style={{color: '#722f37'}}></i>
                  <h6>Expert Recommendations</h6>
                  <p className="card-text small text-muted">
                    Get professional sommelier-level wine pairing suggestions
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <i className="fas fa-dollar-sign fa-2x mb-3" style={{color: '#722f37'}}></i>
                  <h6>Price Filtering</h6>
                  <p className="card-text small text-muted">
                    Set your budget and find wines within your price range
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <i className="fas fa-star fa-2x mb-3" style={{color: '#722f37'}}></i>
                  <h6>Quality Ratings</h6>
                  <p className="card-text small text-muted">
                    View ratings and reviews to make informed choices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinePairing;