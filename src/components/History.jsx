import { useEffect, useState } from "react";
import { getConversations } from "../utils/conversationManage";

function History({ onHistoryItemClick }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchedConversations = getConversations();
    setConversations(fetchedConversations);
  }, []);

  return (
    <div>
      {conversations.map((con) => (
        <div className="p-2" onClick={() => onHistoryItemClick(con.id)} key={con.id}> {/* Update onClick to use the passed handler */}
          {con.id}
        </div>
      ))}
    </div>
  );
}

export default History;
