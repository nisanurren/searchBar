import { useNavigate } from "react-router";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import History from "./History";
import { useDispatch } from "react-redux";
import { clearToken } from "../store/userSlice";
import { useSelector } from "react-redux";
import { setStream } from "../store/questionSlice";

function SideBar({ clickedChat }) {
  const { pathname } = window?.location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const stream = useSelector((state) => state.question.stream); // Access conversations from Redux store

  const onClick = (path) => {
    navigate(path);
  };


  const pathSelector = (path) => {
    if (pathname === path) {
      return "bg-fini-blue text-white rounded-xl";
    } else {
      return "text-gray-400 ";
    }
  };

  const handleItemClick = (id) => {
    clickedChat(id);
  };

  const logout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(setStream(enabled)); // Dispatch action to set conversations in Redux state
  }, [enabled]);

  return (
    <div className="p-8 border-r shadow-lg" style={{ minWidth: "260px" }}>
      <div className="flex pb-4 justify-center">
        <img src={"/fini-logo.png"} className="mr-4" style={{ height: 40 }} />
      </div>

      <div className="mt-5">
        <History clickedItem={handleItemClick}></History>
      </div>

      <div
        style={{ maxWidth: "260px" }}
        className=" absolute bottom-10 p-4 left-10"
      >
        <div className="ml-3 flex pb-4">
          <div className="text-gray-700 mr-2">Stream:</div>
          <div
            className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
              enabled ? "bg-blue-900" : "bg-gray-300"
            }`}
            onClick={() => setEnabled(!enabled)}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                enabled ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <button
          onClick={logout}
          type="button"
          className=" bottom-10 p-3 rounded-xl w-full text-gray-700 bg-transparent border-none cursor-pointer hover:bg-gray-100"
        >
          <div className="flex w-full">
            <div className="pr-3">Signout</div>
            <LogoutIcon></LogoutIcon>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
