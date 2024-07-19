import { useEffect } from "react";
import { FormControl, OutlinedInput,InputLabel, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className=" w-full ">
        <div className="bg-white p-8 rounded shadow-mdmax-w-sm">
      <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="filled-adornment-amount">Ask me</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          endAdornment={<InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
          </InputAdornment>}
          label="Amount"
        />
      </FormControl>

      </div>
    </div>
  );
}
export default SearchBar;
