import React, { useState } from 'react';
import { SUPPORTED_CURRENCIES, getUserCurrency, setUserCurrency } from '../utils/currencyUtils';

const CurrencySelector = ({ onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(getUserCurrency());
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setUserCurrency(currency);
    setIsOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

  const currentCurrency = SUPPORTED_CURRENCIES[selectedCurrency];

  return (
    <div className="currency-selector position-relative">
      <button
        className="btn btn-outline-light d-flex align-items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--border-radius-md)'
        }}
      >
        <span>{currentCurrency?.symbol}</span>
        <span className="d-none d-md-inline">{selectedCurrency}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} small`}></i>
      </button>

      {isOpen && (
        <div 
          className="currency-dropdown position-absolute top-100 end-0 mt-2"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--gray-200)',
            minWidth: '200px',
            zIndex: 1000
          }}
        >
          {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
            <button
              key={code}
              className="currency-option w-100 text-start border-0 bg-transparent p-3"
              onClick={() => handleCurrencyChange(code)}
              style={{
                color: code === selectedCurrency ? 'var(--primary-color)' : 'var(--gray-700)',
                backgroundColor: code === selectedCurrency ? 'var(--gray-50)' : 'transparent',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (code !== selectedCurrency) {
                  e.target.style.backgroundColor = 'var(--gray-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (code !== selectedCurrency) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-medium">{info.symbol} {code}</span>
                  <div className="small text-muted">{info.name}</div>
                </div>
                {code === selectedCurrency && (
                  <i className="fas fa-check text-primary"></i>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;