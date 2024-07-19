import React from 'react';
import { TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setApiKey } from '../store/userSlice';

const LoginComponent = () => {

const [apiKey, setApiKeyLocal] = useState('');
const apiKeyFromStore = useSelector((state) => state.user.apiKey);

const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
  if (apiKeyFromStore) {
    navigate('/');
  }
}, [apiKeyFromStore, navigate]);


const handleApiKey = (e) => {
  setApiKeyLocal(e.target.value);
};

const login = (e) =>{
  e.preventDefault();
  console.log(apiKey);
  dispatch(setApiKey(apiKey));
  navigate('/');
}

  return (
    <div className="min-h-screen flex items-center  w-full justify-center bg-gradient-custom">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form action="submit" onSubmit={login}>

        <TextField value={apiKey}  onChange={handleApiKey} className="w-full" id="outlined-basic" label="Credential" variant="outlined" />

        <Button     sx={{
        width: '100%',
        marginTop: '0.5rem',
        backgroundColor: '#0052cc', // Tailwind color slate-200
        '&:hover': {
          backgroundColor: '#023075', 
        },
      }} type="submit" className="w-full mt-2 bg-slate-200 rounded" variant="contained">Login</Button>


        </form>

   
      </div>
    </div>
  );
};

export default LoginComponent;