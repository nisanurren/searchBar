import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistory }  from '../store/chatHistorySlice';

function HistoryPage() {
    const dispatch = useDispatch();
    const { chatHistory, status, error } = useSelector((state) => state.chatHistory);

    useEffect(() => {
        dispatch(getChatHistory({source:['all'], startEpoch:1718830800000 , endEpoch: 1721509199999}))
    },[dispatch]);
    
    return (
        <div className="min-h-screen flex items-center  w-full justify-center bg-gradient-custom">
            <ul>
              {chatHistory[0]?.botName}
            </ul>
        </div>
    )
    }
    export default HistoryPage;