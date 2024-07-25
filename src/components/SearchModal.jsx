import React, { useEffect, useState, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import ConversationService from "../utils/conversationManage";
import { useSelector, useDispatch } from "react-redux";
import {
  askQuestionToChatBot,
  setQuestion,
  setCurrentConversation,
} from "../store/questionSlice";
import SendIcon from "@mui/icons-material/Send";
import { setChats } from "../store/previousChatSlice";

const SearchModal = ({
  open,
  question,
  onQuestionChange,
  onSubmit,
  chatHistory,
  session,
  displayedResponse,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const status = useSelector((state) => state.question.status);

  useEffect(() => {
    if (open) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      let conversationID = "";
      if (!session) {
        conversationID = "conv_" + new Date().getTime();
        dispatch(setCurrentConversation([]));
      } else {
        conversationID = session.id;
        dispatch(setCurrentConversation(session.conversation));
      }
      // Clear current chat
      setConversationId(conversationID); // Start new chat
    }
  }, [open, dispatch]);

  const urlRegex = /(https?:\/\/[^\s\[\]()]+(?:[^\s\[\]()]*))/g;

  const formatText = (text) => {
    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      const parts = line.split(urlRegex);
      const urls = line.match(urlRegex) || [];

      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            const cleanPart = part.replace(/[^\S\r\n]+$/, "");

            return (
              <React.Fragment key={partIndex}>
                {urls.includes(part) ? (
                  <a
                    href={part.replace(/[^\S\r\n]+$/, "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-1"
                  >
                    Visit Link
                  </a>
                ) : (
                  cleanPart
                )}
              </React.Fragment>
            );
          })}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    if (chatHistory.length && conversationId) {
      const updatedConversation = {
        id: conversationId,
        question,
        conversation: chatHistory,
      };
      ConversationService.saveConversation(updatedConversation); // Save the current chat
      const fetchedConversations = ConversationService.getConversations();
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
      { role: "user", content: question },
      { role: "assistant", content: displayedResponse },
    ];
    const updatedConversation = {
      id: conversationId,
      question,
      conversation: updatedChatHistory,
    };
    ConversationService.saveConversation(updatedConversation);
    const fetchedConversations = ConversationService.getConversations();
    dispatch(setChats(fetchedConversations));

    onSubmit();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full rounded-lg shadow-lg relative sm:mx-10 below-sm:m-5 " style={{width: 770}}>
        <div className="p-6 rounded-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                dispatch(setCurrentConversation([]));
                setConversationId("");
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div ref={containerRef} className="mb-4 overflow-y-auto"  style={{ maxHeight: 600 }} >
            {chatHistory.map(
              (entry, index) =>
                entry.role !== "system" && (
                  <div
                    key={index}
                    className={`flex mb-4 transition-transform duration-500 ease-in-out ${
                      entry.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex">
                      {entry.role === "assistant" ? (
                        <img
                          className="w-3 h-3 mt-2 mr-5"
                          src="./fini-icon.png"
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      <div
                        className={`rounded-lg text-left break-words ${
                          entry.role === "user"
                            ? "bg-gray-600 text-white animate-fadeIn"
                            : "bg-[#f4f4f4] text-black animate-fadeIn"
                        } p-2 rounded`}
                      >
                        {entry.role === "user"
                          ? entry.content
                          : index < chatHistory.length - 1
                          ? formatText(entry.content)
                          : formatText(entry.content)}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          {status === "loading" && (
            <div className="flex justify-start items-left mb-4">
              <div className="mb-4 flex">
                <img
                  className="w-3 h-3 mt-2 mr-5"
                  src="./fini-icon.png"
                  alt=""
                />
                <div className="rounded-lg text-left bg-gray-100 text-black animate-fadeIn p-2">
                  <CircularProgress size={20} />
                </div>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} action="submit">
            <div className="relative mb-4">
              <input
                ref={inputRef}
                type="text"
                id="question"
                className="w-full p-3 h-14 rounded-[26px]  focus:outline-none  bg-[#f4f4f4]"
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
