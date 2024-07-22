import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { askQuestionToChatBot, setQuestion } from "../store/questionSlice";
import SearchModal from '../components/SearchModal';
import { LocalHospital } from "@mui/icons-material";

function SearchBar() {
  const [question, setLocalQuestion] = useState("");
  const { chatHistory, latestResponse, status, error } = useSelector((state) => state.question);

  const [displayedResponse, setDisplayedResponse] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleQuestionChange = (e) => {
    setLocalQuestion(e.target.value);
  };

  const handleQuestionSubmit = () => {
    if (!question.length) return;
    setDisplayedResponse('');
    setResponseIndex(0);
    dispatch(setQuestion(question))
    dispatch(askQuestionToChatBot(question));
    setLocalQuestion('');
  };

  useEffect(() => {

    console.log(latestResponse)
  }, [latestResponse]);

  return (
    <div className="w-full">
      <div className="bg-transparent p-8 rounded shadow-md max-w-sm border border-fini-light">
        <form className="w-full p-8 rounded shadow-md" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="question" className="block text-[#ccdae7] text-xl mb-4">
            Ask me
          </label>
          <div className="relative mb-4">
            <input
              type="text"
              id="question"
              className="w-full p-4 border h-14 border-[#ccdae7] rounded-xl text-[#ccdae7] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ccdae7]"
              placeholder="Ask me"
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
      </div>

      <SearchModal
        open={modalOpen}
        question={question}
        onQuestionChange={handleQuestionChange}
        onSubmit={handleQuestionSubmit}
        chatHistory={chatHistory}
        displayedResponse={displayedResponse}
      />
    </div>
  );
}

export default SearchBar;
