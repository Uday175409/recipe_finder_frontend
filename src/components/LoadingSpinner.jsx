import React from 'react';

const LoadingSpinner = ({ text = 'Loading...', size = 'medium' }) => {
  const sizeClass = {
    small: 'loading-spinner-sm',
    medium: 'loading-spinner',
    large: 'loading-spinner-lg'
  };

  return (
    <div className="loading-container">
      <div className={sizeClass[size] || 'loading-spinner'}></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default LoadingSpinner;