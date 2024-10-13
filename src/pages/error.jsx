import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <div className="error-page  h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
