import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { getConversations, saveConversation, getConversationById } from '../utils/conversationManage';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentConversation } from '../store/questionSlice';

const SearchModal = ({ open, question, onQuestionChange, onSubmit, chatHistory, session, displayedResponse, onClose }) => {
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);


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

    onSubmit();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-2xl rounded-lg shadow-lg relative">
        <div className="p-6 rounded-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={function(){
                dispatch(setCurrentConversation([]));
                setConversationId('');
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div ref={containerRef} className="mb-4 max-h-90 overflow-y-auto">
            {chatHistory.map((entry, index) => (
              entry.role !== 'system' && (
                <div
                  key={index}
                  className={`flex mb-2 transition-transform duration-500 ease-in-out ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`rounded-lg text-left  ${entry.role === "user" ? "bg-fini-blue text-white animate-fadeIn" : "bg-white text-black border border-fini-blue animate-fadeIn"} p-2 rounded`}>                  
                    {entry.role === "user" ? entry.content : index < chatHistory.length - 1 ? entry.content : entry.content}
                  </div>
                </div>
              )
            ))}
          </div>
          <form onSubmit={handleSubmit} action="submit">
            <div className="mb-4">
              <input
                ref={inputRef} 
                type="text"
                id="question"
                className="w-full p-3 h-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask anything..."
                value={question}
                onChange={onQuestionChange}
              />
            </div>
            <div className="w-full">
              <button
                type='submit'
                className="w-full h-14 bg-fini-blue text-white px-4 py-2 rounded-lg hover:bg-fini-blue focus:outline-none focus:ring-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
