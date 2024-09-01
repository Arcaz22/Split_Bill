import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '@/lib/index';
import { PrivateRouteProps } from '@/lib/interface/privateroute-interface';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const user = getUser();
  console.log('User in PrivateRoute:', user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
