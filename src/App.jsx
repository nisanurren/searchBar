import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HelpCenter from "./pages/HelpCenter";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const providerState = {};

  const AppContext = createContext();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
      <GoogleOAuthProvider clientId={clientId}>
        <AppContext.Provider value={providerState}>
          <div className="bg-white">
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<HelpCenter />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </div>
        </AppContext.Provider>
      </GoogleOAuthProvider>
  );
}

export default App;
