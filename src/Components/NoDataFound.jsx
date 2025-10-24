import React from 'react';
import { Link } from 'react-router';

const NoDataFound = ({ 
  message = "No data found", 
  description = "There's nothing here yet.", 
  showButton = false, 
  buttonText = "Go Back", 
  buttonLink = "/" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="mb-6">
        <svg
          className="w-32 h-32 text-base-300 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-base-content mb-3">
        {message}
      </h3>
      
      <p className="text-base-content/70 mb-6 max-w-md">
        {description}
      </p>
      
      {showButton && (
        <Link to={buttonLink} className="btn btn-primary">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default NoDataFound;
