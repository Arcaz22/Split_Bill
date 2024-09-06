import React from 'react';
import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { getUser } from '@/lib/index';
import { useCheckToken } from '../custom/useCheckToken';

export const PrivateRoute: React.FC = () => {
    useCheckToken();

    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
