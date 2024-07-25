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
    const token = response.credential;
    dispatch(setToken(token));
  };

  const handleFailure = (error) => {
    return error
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
      <p className="text-center mb-6 text-gray-600">
        Welcome! Please login to your account.
      </p>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          onError={handleFailure}
          size="large"
          shape="pill"
          width="250"
          ux_mode="popup"
          theme="filled_blue"
          text="signin_with"
        />
      </div>
    </div>
  </div>
);
};

export default LoginComponent;