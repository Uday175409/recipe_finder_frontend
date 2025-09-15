import React, { useState, useEffect } from 'react';
import { convertAndFormatPrice, getUserCurrency, getLocalPricingContext } from '../utils/currencyUtils';

const PriceDisplay = ({ 
  usdPrice, 
  showContext = false, 
  size = 'medium',
  className = '' 
}) => {
  const [displayPrice, setDisplayPrice] = useState('Loading...');
  const [priceContext, setPriceContext] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(getUserCurrency());

  useEffect(() => {
    const convertPrice = async () => {
      try {
        setLoading(true);
        const formatted = await convertAndFormatPrice(usdPrice, currency);
        setDisplayPrice(formatted);

        // Add local context for Indian users
        if (currency === 'INR' && showContext) {
          const { convertPrice } = await import('../utils/currencyUtils');
          const inrPrice = await convertPrice(usdPrice, 'INR');
          setPriceContext(getLocalPricingContext(inrPrice));
        }
      } catch (error) {
        console.error('Price conversion error:', error);
        setDisplayPrice(`$${usdPrice.toFixed(2)}`); // Fallback to USD
      } finally {
        setLoading(false);
      }
    };

    convertPrice();
  }, [usdPrice, currency, showContext]);

  // Listen for currency changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrency(getUserCurrency());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const sizeClasses = {
    small: 'fs-6',
    medium: 'fs-5',
    large: 'fs-4'
  };

  if (loading) {
    return (
      <span className={`price-display ${className}`}>
        <span className="placeholder-glow">
          <span className="placeholder col-3"></span>
        </span>
      </span>
    );
  }

  return (
    <span className={`price-display ${sizeClasses[size]} ${className}`}>
      <span className="price-amount fw-bold text-primary">
        {displayPrice}
      </span>
      {showContext && priceContext && (
        <span 
          className="price-context ms-2 badge"
          style={{
            backgroundColor: priceContext === 'Budget-friendly' ? 'var(--secondary-color)' :
                           priceContext === 'Moderate' ? 'var(--accent-color)' :
                           priceContext === 'Premium' ? 'var(--primary-color)' : 'var(--gray-600)',
            color: priceContext === 'Moderate' ? 'var(--gray-800)' : 'white',
            fontSize: '0.7rem'
          }}
        >
          {priceContext}
        </span>
      )}
    </span>
  );
};

export default PriceDisplay;