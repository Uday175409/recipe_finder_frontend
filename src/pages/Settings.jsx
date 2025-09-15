import React, { useState, useEffect } from 'react';
import { SUPPORTED_CURRENCIES, getUserCurrency, setUserCurrency } from '../utils/currencyUtils';
import PriceDisplay from '../components/PriceDisplay';

const Settings = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency());
  const [saved, setSaved] = useState(false);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setUserCurrency(currency);
    setSaved(true);
    
    // Clear the saved message after 3 seconds
    setTimeout(() => setSaved(false), 3000);
    
    // Notify other components of currency change
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: currency }));
  };

  // Example prices for demonstration
  const examplePrices = [2.50, 5.75, 12.99, 25.00];

  return (
    <div className="container-custom section-padding">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0" style={{ borderRadius: 'var(--border-radius-xl)' }}>
            <div className="card-header bg-gradient text-white text-center py-4" 
                 style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: 'var(--border-radius-xl) var(--border-radius-xl) 0 0' }}>
              <h2 className="mb-0">
                <i className="fas fa-cog me-3"></i>
                App Settings
              </h2>
            </div>
            
            <div className="card-body p-5">
              {/* Currency Settings */}
              <div className="mb-5">
                <h4 className="mb-4">
                  <i className="fas fa-money-bill-wave me-2 text-primary"></i>
                  Currency Preferences
                </h4>
                
                <p className="text-muted mb-4">
                  Choose your preferred currency for displaying recipe prices and costs. 
                  Prices will be automatically converted from USD using current exchange rates.
                </p>

                {saved && (
                  <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Currency preference saved successfully!
                  </div>
                )}

                <div className="row g-3">
                  {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
                    <div key={code} className="col-md-6">
                      <div 
                        className={`currency-option-card p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedCurrency === code ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                        }`}
                        onClick={() => handleCurrencyChange(code)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          borderWidth: selectedCurrency === code ? '2px' : '1px'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold d-flex align-items-center">
                              <span className="me-2 fs-5">{info.symbol}</span>
                              <span>{code}</span>
                              {selectedCurrency === code && (
                                <i className="fas fa-check text-primary ms-2"></i>
                              )}
                            </div>
                            <div className="small text-muted">{info.name}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="currency"
                              checked={selectedCurrency === code}
                              onChange={() => handleCurrencyChange(code)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Preview */}
              <div className="mb-5">
                <h5 className="mb-3">
                  <i className="fas fa-eye me-2 text-secondary"></i>
                  Price Preview
                </h5>
                <p className="text-muted mb-3">
                  Here's how prices will appear in your selected currency:
                </p>
                
                <div className="row g-3">
                  {examplePrices.map((price, index) => (
                    <div key={index} className="col-6 col-md-3">
                      <div className="bg-light p-3 rounded text-center">
                        <div className="small text-muted mb-1">USD ${price}</div>
                        <div className="fw-bold">
                          <PriceDisplay 
                            usdPrice={price} 
                            showContext={selectedCurrency === 'INR'}
                            size="medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indian Users Special Note */}
              {selectedCurrency === 'INR' && (
                <div className="alert alert-info border-0" style={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}>
                  <div className="d-flex align-items-start">
                    <i className="fas fa-info-circle me-3 mt-1"></i>
                    <div>
                      <h6 className="mb-2">Special Features for Indian Users</h6>
                      <ul className="mb-0 ps-3">
                        <li>Prices include helpful context (Budget-friendly, Moderate, Premium)</li>
                        <li>Exchange rates updated hourly for accuracy</li>
                        <li>Costs reflect typical Indian market pricing where possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Settings */}
              <div className="border-top pt-4">
                <h5 className="mb-3">
                  <i className="fas fa-sliders-h me-2 text-warning"></i>
                  Display Options
                </h5>
                
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="showPriceContext" defaultChecked />
                  <label className="form-check-label" htmlFor="showPriceContext">
                    Show price context (Budget-friendly, Premium, etc.)
                  </label>
                </div>
                
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="autoUpdateRates" defaultChecked />
                  <label className="form-check-label" htmlFor="autoUpdateRates">
                    Automatically update exchange rates
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;