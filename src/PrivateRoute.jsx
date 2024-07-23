import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const [openingChat, setOpeningChat] = useState(false);

    const apiKey = useSelector((state) => state.user.apiKey);
    if (!apiKey) {
        return <Navigate to="/login" replace />;
    }

    const clickedChat = (a) => {
        console.log(a);
        setOpeningChat(a);
        console.log(openingChat);
    };
    return (
        <div className="flex h-full">
        <SideBar clickedChat={clickedChat}></SideBar>
            <Outlet context={{ openingChat, setOpeningChat  }} />
        </div>
      );
};

export default PrivateRoute;
