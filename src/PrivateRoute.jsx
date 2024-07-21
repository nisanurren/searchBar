import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const apiKey = useSelector((state) => state.user.apiKey);
    if (!apiKey) {

        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-full overflow-hidden">
        <SideBar></SideBar>
        
            <Outlet />
    
        </div>
      );
};

export default PrivateRoute;
