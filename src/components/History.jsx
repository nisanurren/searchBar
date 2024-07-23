import { useEffect, useState } from "react";
import { getConversations } from "../utils/conversationManage";

function History({ onHistoryItemClick }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchedConversations = getConversations();
    setConversations(fetchedConversations);
  }, []);

  return (
    <div style={{ maxWidth: "260px" }} className="p-8 h-screen text-left">
      <div className="text-gray-600 p-3">Latest Chats:</div>
      <ul>
        {conversations.map((item) => (
          <li
            key={item.id}
            onClick={() => onHistoryItemClick(item.id)}
            className="text-gray-400 p-3 hover:bg-fini-blue hover:text-white rounded-xl hover:rounded-xl`}"
          >
            {item.conversation[0].content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
