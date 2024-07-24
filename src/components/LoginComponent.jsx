import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/userSlice";
import { GoogleLogin } from "@react-oauth/google";

const LoginComponent = () => {
  const tokenFromStore = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenFromStore) {
      navigate("/");
    }
  }, [tokenFromStore, navigate]);

  const handleSuccess = (response) => {
    console.log("Login successful:", response);
    const token = response.credential;
    dispatch(setToken(token));
  };

  const handleFailure = (error) => {
    console.error("Login failed:", error);
  };

  return (
    <div className="min-h-screen flex items-center  w-full justify-center">
      <div className="bg-white p-8 rounded w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          onError={handleFailure}
        />
      </div>
    </div>
  );
};

export default LoginComponent;