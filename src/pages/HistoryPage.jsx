import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistory }  from '../store/chatHistorySlice';
import HistoryTable  from '../components/HistoryTable'

function HistoryPage() {
    const dispatch = useDispatch();
    const { chatHistory, status, error } = useSelector((state) => state.chatHistory);

    useEffect(() => {
        dispatch(getChatHistory({source:['all'], startEpoch:1718830800000 , endEpoch: 1761509199999}))
    },[dispatch]);
    
    return (
        <div className="min-h-screen w-full justify-center bg-gradient-custom p-20">
          <HistoryTable history={chatHistory}></HistoryTable>
        </div>
    )
    }
    export default HistoryPage;