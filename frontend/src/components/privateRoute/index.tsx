import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '@/lib/index';

export const PrivateRoute: React.FC = () => {
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
