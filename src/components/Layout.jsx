import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = () => {
    return (
        <div>
            <NavBar />
            <div className="container mt-3">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
