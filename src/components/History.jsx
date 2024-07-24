import { useEffect } from "react";
import { getConversations } from "../utils/conversationManage";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from '../store/previousChatSlice';

function History({ clickedItem }) {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.previousChats.conversations); // Access conversations from Redux store

  useEffect(() => {
    const fetchedConversations = getConversations();
    dispatch(setChats(fetchedConversations)); // Dispatch action to set conversations in Redux state
  }, [dispatch]);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  };

  return (
    <div style={{ maxWidth: "260px" }} className="p-8 pl-4 text-left rounded-lg">
      <ul className="max-h-96 overflow-auto">
        {conversations.map((item) => (
          <li
            key={item.id}
            onClick={() => clickedItem(item.id)}
            className="cursor-pointer text-gray-700 p-3 hover:bg-gray-100 hover:text-gray-600 rounded-xl"
          >
            {truncateContent(item.conversation[0].content, 14)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
