import { useEffect, useState } from "react";
import { blue } from '@mui/material/colors';
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

function SearchBar() {
  const [question, setLocalQuestion] = useState("");
  const dispatch = useDispatch();

  const handleQuestion = (e) => {
    console.log(e)
    e.preventDefault();
    setLocalQuestion(e.target.value);
  };

  const askQuestion = (e) => {
    e.preventDefault();
    if (!question.length) {
      return;
    }
    dispatch(setQuestion(question))
    dispatch(askQuestionToChatBot(question))
  };

  return (
    <div className="w-full">
      <div className="bg-transparent p-8 rounded shadow-mdmax-w-sm border border-fini-light">
        <form className="w-full p-8 rounded shadow-md" onSubmit={askQuestion}>
        <label htmlFor="question" className="block text-[#ccdae7] text-xl mb-4">
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
    </div>
  );
}
export default SearchBar;
