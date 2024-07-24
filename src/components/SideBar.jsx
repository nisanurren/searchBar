import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import History from "./History";

function SideBar({ clickedChat }) {
  const { pathname } = window?.location;
  const navigate = useNavigate();

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
    console.log("Selected item ID:", id);
    clickedChat(id);
  };

  const sidebarItems = [
    { path: "/", label: "Home" },
    { path: "/history", label: "History" },
  ];

  return (
    <div className="p-8 border-r shadow-lg" style={{ minWidth: "260px" }}>
      <div className="flex pb-4 justify-center">
        <img src={"/fini-logo.png"} className="mr-4" style={{ height: 40 }} />
      </div>

      <div className="mt-5">
        <History clickedItem={handleItemClick}></History>
      </div>

      <button
      style={{ maxWidth: "260px" }} 
        type="button"
        className=" absolute bottom-10 p-3 rounded-xl left-10 text-gray-700 bg-transparent border-none cursor-pointer hover:bg-gray-100"
      >
        <div className="flex w-full">

          <LogoutIcon></LogoutIcon>
          <div className="pl-1">Signout</div>
        </div>
      </button>

     
    </div>
  );
}

export default SideBar;
