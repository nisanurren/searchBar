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
    <div className="p-8" style={{ minWidth: "260px" }}>
      <div className="flex pb-4 justify-center">
        <img src={"/fini-logo.png"} className="mr-4" style={{ height: 40 }} />
      </div>

      <div className="mt-5">
        <History clickedItem={handleItemClick}></History>
      </div>

      <button
        type="button"
        className=" absolute bottom-10 p-2 rounded-md left-10 text-gray-700 bg-transparent border-none cursor-pointer hover:bg-gray-300"
      >
        <div className="flex">

          <LogoutIcon></LogoutIcon>
          <div className="pl-1">Signout</div>
        </div>
      </button>

      {/* <ul className="mt-5">
        {sidebarItems.map(
          (item, index) => (
            <li
              className={`mb-4 px-6 py-3 cursor-pointer text-center ${pathSelector(
                item.path
              )} hover:bg-fini-blue hover:text-white hover:rounded-xl`}
              onClick={() => onClick(item.path)}
              key={index}
            >
              {item.label}
            </li>
          )
        )}
      </ul> */}
    </div>
  );
}

export default SideBar;
