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

    if (!latestResponse) return;

    const intervalId = setInterval(() => {
      if (responseIndex < latestResponse.length) {
        setDisplayedResponse((prev) => prev + latestResponse[responseIndex]);
        setResponseIndex((prev) => prev + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [latestResponse, responseIndex]);


  return (
    <div className="w-full">

        <form className="w-full p-8 bg-white bg-opacity-10 p-8 rounded-xl " onSubmit={(e) => e.preventDefault()}>
          <div className="relative mb-4">
            <input
              type="text"
              id="question"
              className="w-full p-4 border h-14 border-[#ccdae7] rounded-xl text-[#ccdae7] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ccdae7]"
              placeholder="Ask anything"
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
        displayedResponse={displayedResponse}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default SearchBar;
