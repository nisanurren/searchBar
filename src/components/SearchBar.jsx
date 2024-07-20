import { useEffect, useState } from "react";
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
    setLocalQuestion(e.target.value);
  };

  const askQuestion = () => {
    if (!question.length) {
      return;
    }

    dispatch(setQuestion(question))
    dispatch(askQuestionToChatBot(question))
  };

  return (
    <div className=" w-full ">
      <div className="bg-white p-8 rounded shadow-mdmax-w-sm">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="filled-adornment-amount">Ask me</InputLabel>
          <OutlinedInput
            value={question}
            onChange={handleQuestion}
            id="outlined-adornment-amount"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={askQuestion} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Ask me"
          />
        </FormControl>
      </div>
    </div>
  );
}
export default SearchBar;
