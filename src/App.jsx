import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css'
import LoginPage from './pages/LoginPage';
import HistoryPage from './pages/HistoryPage';
import HelpCenter from './pages/HelpCenter';
import PrivateRoute from './PrivateRoute';


function App() {

  const providerState = {};

  const AppContext = createContext()

  return (
    <div>
      <AppContext.Provider value={providerState}>
        <div className='bg-gradient-custom'>
          <Router>
          
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                <Route path="/" element={<HelpCenter />} />
                <Route path="/history" element={<HistoryPage></HistoryPage> }></Route>
                </Route>
              </Routes>
          </Router>
          </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
