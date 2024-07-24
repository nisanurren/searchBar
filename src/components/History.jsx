import { useEffect, useState } from "react";
import { getConversations } from "../utils/conversationManage";

function History({ clickedItem }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchedConversations = getConversations();
    setConversations(fetchedConversations);
  }, []);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    }
    return content;
  };
  return (
    <div style={{ maxWidth: "260px" }} className="p-8 pl-4 text-left">
      <div className="text-gray-600 p-3">Latest Chats:</div>
      <ul className=" max-h-96 overflow-auto">
        {conversations.map((item) => (
          <li
            key={item.id}
            onClick={() =>(clickedItem(item.id))}
            className="cursor-pointer text-gray-700 p-3 hover:bg-fini-blue hover:text-white rounded-xl hover:rounded-xl`}"
          >
            {truncateContent(item.conversation[0].content, 15)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
