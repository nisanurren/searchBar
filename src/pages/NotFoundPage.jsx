import React from "react";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-9xl font-extrabold text-gray-800">404</div>
        <p className="text-2xl text-gray-700 mt-4">Oops! Page Not Found</p>
        <p className="text-lg text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <button 
          onClick={handleGoHome}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
