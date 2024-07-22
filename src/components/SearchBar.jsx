import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import questionSlice from "../store/questionSlice";
import { useSelector } from "react-redux";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { askQuestionToChatBot, setQuestion } from "../store/questionSlice";
import { RestorePageOutlined } from "@mui/icons-material";

function SearchBar() {
  const [question, setLocalQuestion] = useState("");
  const { chatHistory, status, error } = useSelector((state) => state.question);
  const {latestResponse} = useSelector((state) => state.question);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const lastResponse =
    chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].content : "";
  const [responseIndex, setResponseIndex] = useState(0);

  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const handleQuestion = (e) => {
    e.preventDefault();
    setLocalQuestion(e.target.value);
  };

  const askQuestion = (e) => {
    e.preventDefault();
    if (!question.length) {
      return;
    }
    setDisplayedResponse("");
    setIndex(0);
    dispatch(askQuestionToChatBot(question));
    setLocalQuestion("")
  };

  useEffect(() => {
    const latestResponse = chatHistory[chatHistory.length - 1]?.content;
    if (!latestResponse) return;

    let localIndex = 0;
    const intervalId = setInterval(() => {
      if (localIndex < latestResponse.length) {
        setDisplayedResponse((prev) => prev + latestResponse[localIndex]);
      
        setResponseIndex(localIndex); 
        localIndex += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  
  }, [chatHistory]);

  return (
    <div className="w-full">
      <div className=" bg-opacity-10 bg-white p-8 rounded ">
        <form className="w-full p-8 rounded" onSubmit={askQuestion}>
          <label
            htmlFor="question"
            className="block text-[#ccdae7] text-xl mb-4"
          >
            Ask me
          </label>
          <div className="relative mb-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestion}
              className="w-full p-4 border h-14 border-[#ccdae7] rounded-xl text-[#ccdae7] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ccdae7]"
              placeholder="Ask me"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-[#ccdae7] bg-transparent border-none cursor-pointer"
            >
              <SearchIcon />
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-2 h-14 py-2  rounded-xl bg-transparent border border-fini-light text-fini-light hover:hover:bg-fini-blue hover:text-white hover:rounded-xl hover:border-none"
          >
            Submit
          </button>
        </form>
      </div>
      <div></div>

      {
        chatHistory.length ? (<div className="mt-4 p-4 bg-opacity-10 bg-white rounded-md  shadow-md w-full  text-[#ccdae7]">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              entry.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                entry.role === "user"
                  ? "bg-fini-blue text-white"
                  : "bg-gray-300 text-black"
              } p-2 rounded text-left`}
            >
              <strong>{entry.role === "user" ? "You" : "Bot"}:</strong>{" "}
              {entry.role === "user"
                ? entry.content
                : index < chatHistory.length -1
                ? entry.content
                : entry.content}
            </div>
          </div>
        ))}
      </div>) : ''
      }
    </div>
  );
}
export default SearchBar;
