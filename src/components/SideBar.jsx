import { useNavigate } from "react-router";


function SideBar() {
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

  const sidebarItems = [{path: '/', label: 'Home'}, {path: '/history', label: 'History'}]

  return (
    <div className="p-8 h-screen bg-gradient-custom" style={{ minWidth: "260px" }}>
      <div className="flex pb-4 justify-center">
        <img src={"/fini-logo.png"} className="mr-4" style={{ height: 40 }} />
      </div>
      <ul className="mt-5">
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
      </ul>
    </div>
  );
}


export default SideBar;