import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
