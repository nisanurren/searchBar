import { useEffect } from "react";
import ConversationService from "../utils/conversationManage";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from '../store/previousChatSlice';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function History({ clickedItem }) {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.previousChats.conversations); // Access conversations from Redux store

  useEffect(() => {
    const fetchedConversations = ConversationService.getConversations();
    dispatch(setChats(fetchedConversations)); // Dispatch action to set conversations in Redux state
  }, [dispatch]);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  };


  const deleteConversation =(id)=>{
    ConversationService.deleteConversationById(id)
    const fetchedConversations = ConversationService.getConversations();
    dispatch(setChats(fetchedConversations)); 
  }

  return (
    <div style={{ maxWidth: "260px" }} className="p-8 pl-1 pr-2 text-left rounded-lg">
      <ul className="max-h-96 overflow-auto py-1">
        {conversations.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center"
          >
           <div className="cursor-pointer text-gray-700 p-3 hover:bg-gray-100 hover:text-gray-600 rounded-xl w-full" onClick={() => clickedItem(item.id)}>
           {truncateContent(item.conversation[0].content, 20)}
           </div>
           <DeleteOutlinedIcon onClick={()=> deleteConversation(item.id) } fontSize="small" className="text-red-600 cursor-pointer w-4 h-4 hover:shadow-sm"></DeleteOutlinedIcon>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
