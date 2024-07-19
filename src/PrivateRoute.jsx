import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const apiKey = useSelector((state) => state.user.apiKey);
    if (!apiKey) {

        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
