import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { getConversations, saveConversation, getConversationById } from '../utils/conversationManage';
import { useSelector, useDispatch } from "react-redux";
import { askQuestionToChatBot, setQuestion, setCurrentConversation } from '../store/questionSlice';
import SendIcon from '@mui/icons-material/Send';
import { setChats } from '../store/previousChatSlice';

const SearchModal = ({ open, question, onQuestionChange, onSubmit, chatHistory, session, displayedResponse, onClose }) => {
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const status = useSelector((state) => state.question.status);

  useEffect(() => {
    if (open) {

      if (inputRef.current) {
        inputRef.current.focus();
      }
      let conversationID = ''
      if(!session){
        conversationID = 'conv_' + new Date().getTime();
        dispatch(setCurrentConversation([]));
      } else {
        conversationID = session.id
        dispatch(setCurrentConversation(session.conversation));
      }
       // Clear current chat
      setConversationId(conversationID);  // Start new chat
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (chatHistory.length && conversationId) {
      const updatedConversation = { id: conversationId, question, conversation: chatHistory };
      saveConversation(updatedConversation);  // Save the current chat
      const fetchedConversations = getConversations();
      dispatch(setChats(fetchedConversations));
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    const updatedChatHistory = [
      ...chatHistory,
      { role: 'user', content: question },
      { role: 'assistant', content: displayedResponse }
    ];
    const updatedConversation = { id: conversationId, question, conversation: updatedChatHistory };
    console.log('Updating conversation:', updatedConversation);
    saveConversation(updatedConversation);
    const fetchedConversations = getConversations();
    dispatch(setChats(fetchedConversations));

    onSubmit();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-2xl rounded-lg shadow-lg relative">
        <div className="p-6 rounded-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                dispatch(setCurrentConversation([]));
                setConversationId('');
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div ref={containerRef} className="mb-4 max-h-80 overflow-y-auto">
            {chatHistory.map((entry, index) => (
              entry.role !== 'system' && (
                <div
                  key={index}
                  className={`flex mb-4 transition-transform duration-500 ease-in-out ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex">
                   {entry.role === 'assistant' ?  <img className="w-3 h-3 mt-2 mr-5" src="./fini-icon.png" alt="" /> :''}
                  <div className={`rounded-lg text-left ${entry.role === "user" ? "bg-gray-600 text-white animate-fadeIn" : "bg-gray-100 text-black animate-fadeIn"} p-2 rounded`}>
                    {entry.role === "user" ? entry.content : index < chatHistory.length - 1 ? entry.content : entry.content}
                  </div>
                  </div>
                </div>
              )
            ))}
          </div>
          {status === 'loading' && (
            <div className="flex justify-center items-center mb-4">
              <div className="loader">Loading...</div>
            </div>
          )}
          <form onSubmit={handleSubmit} action="submit">
            
            <div className="relative mb-4">
              <input
                ref={inputRef} 
                type="text"
                id="question"
                className="w-full p-3 h-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask anything..."
                value={question}
                onChange={onQuestionChange}
              />
              <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-[#ccdae7] bg-transparent border-none cursor-pointer"
            >
              <SendIcon />
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
