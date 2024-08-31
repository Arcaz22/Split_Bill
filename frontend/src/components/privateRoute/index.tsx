import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../lib/index';

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const user = getUser(); // Memeriksa apakah user sudah login

  if (!user) {
    // Jika user tidak ada, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika user sudah login, render komponen yang diminta
  return element;
};
