import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './custom/header';

export const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="px-3 lg:px-14">
                <Outlet />
            </main>
        </div>
    );
};
