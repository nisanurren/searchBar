import React, { useEffect, useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { getConversations, saveConversation, getConversationById } from '../utils/conversationManage';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentConversation } from '../store/questionSlice';

const SearchModal = ({ open, question, onQuestionChange, onSubmit, chatHistory, displayedResponse, onClose }) => {
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState('');

  useEffect(() => {
    if (open) {
      dispatch(setCurrentConversation([])); // Clear current chat
      const newId = 'conv_' + new Date().getTime();
      setConversationId(newId);  // Start new chat
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (chatHistory.length && conversationId) {
      const updatedConversation = { id: conversationId, question, conversation: chatHistory };
      saveConversation(updatedConversation);  // Save the current chat
    }
  }, [chatHistory, conversationId, question]);

  const handleSubmit = () => {
    if (!question.trim()) return;
    
    const updatedChatHistory = [
      ...chatHistory,
      { role: 'user', content: question },
      { role: 'assistant', content: displayedResponse }
    ];
    const updatedConversation = { id: conversationId, question, conversation: updatedChatHistory };
    console.log('Updating conversation:', updatedConversation);
    saveConversation(updatedConversation);

    onSubmit();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-2xl rounded-lg shadow-lg relative">
        <div className="p-6 rounded-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mb-4 max-h-60 overflow-y-auto">
            {chatHistory.map((entry, index) => (
              entry.role !== 'system' && (
                <div
                  key={index}
                  className={`flex mb-2 ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`rounded-lg text-left ${entry.role === "user" ? "bg-fini-blue text-white" : "bg-white text-black border border-fini-blue"} p-2 rounded`}>
                    <strong>{entry.role === "user" ? "You" : "Bot"}:</strong>{" "}
                    {entry.role === "user" ? entry.content : index < chatHistory.length - 1 ? entry.content : displayedResponse}
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="question"
              className="w-full p-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask anything"
              value={question}
              onChange={onQuestionChange}
            />
          </div>
          <div className="w-full">
            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-fini-blue text-white px-4 py-2 rounded-lg hover:bg-fini-blue focus:outline-none focus:ring-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
