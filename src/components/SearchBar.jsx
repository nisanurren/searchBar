import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { askQuestionToChatBot, setQuestion } from "../store/questionSlice";
import SearchModal from "../components/SearchModal";
import ConversationManage from "../utils/conversationManage";
import { useOutletContext } from "react-router-dom";

function SearchBar() {
  const [question, setLocalQuestion] = useState("");
  const { openingChat, setOpeningChat } = useOutletContext();
  const { chatHistory, latestResponse, status, error } = useSelector(
    (state) => state.question
  );

  const [session, setSession] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleQuestionChange = (e) => {
    setLocalQuestion(e.target.value);
  };

  const handleQuestionSubmit = () => {
    if (!question.length) return;
    setDisplayedResponse("");
    setResponseIndex(0);
    dispatch(askQuestionToChatBot(question));
    setLocalQuestion("");
  };

  const openingChatTo = (a) => {
    const selectedChatHistory = ConversationManage.getConversationById(a);
    setSession(selectedChatHistory);
    setModalOpen(true);
  };

  useEffect(() => {
    if (openingChat.length) {
      openingChatTo(openingChat);
      setOpeningChat("");
    }
  }, [openingChat]);

  const clearLastChat = () => {
    setSession("");
    setModalOpen(false);
  };

  const openSelectedChat = (value) => {
    const selectedChatHistory = ConversationManage.getConversationById(value);
    setSession(selectedChatHistory);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!latestResponse) return;

    let localIndex = 0; // Use a local variable for response index
    setDisplayedResponse(""); // Reset displayed response
    const intervalId = setInterval(() => {
      if (localIndex < latestResponse.length - 1) {
        setDisplayedResponse((prev) => prev + latestResponse[localIndex]);
        localIndex += 1; // Increment the local index
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [latestResponse]);

  return (
    <div className="w-full max-w-screen-lg m-auto">
      <form
        className="w-full bg-white bg-opacity-10 p-8 rounded-xl "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative mb-4">
          <input
            type="text"
            id="question"
            className="w-full p-4 border h-14 border-[#ccdae7] rounded-xl text-[#ccdae7] bg-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-[#ccdae7]"
            placeholder="Ask anything..."
            onClick={() => setModalOpen(true)}
            readOnly
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 text-[#ccdae7] bg-transparent border-none cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      <SearchModal
        open={modalOpen}
        question={question}
        onQuestionChange={handleQuestionChange}
        onSubmit={handleQuestionSubmit}
        chatHistory={chatHistory}
        session={session}
        displayedResponse={displayedResponse}
        onClose={() => clearLastChat()}
      />
    </div>
  );
}

export default SearchBar;
