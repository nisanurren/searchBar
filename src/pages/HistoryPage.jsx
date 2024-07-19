import { useEffect } from "react";
import axiosInstance from "../axios";


function HistoryPage() {
  
    useEffect(() => {
        axiosInstance.get('/v2/bots/requests/public').then((response)=>{
            console.log(response) 
        }).catch((error)=>{
            console.log(error)
        })
      }, );
      
      
    return (
        <div className="min-h-screen flex items-center  w-full justify-center bg-gradient-custom">
            History
        </div>
    )
    }
    export default HistoryPage;