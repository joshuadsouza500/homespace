import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../user/UserProfile";
import UserFavourites from "../user/UserFavourites";
import UserListings from "../user/UserListings";
import AddProperty from "../user/AddProperty";
import {
  ArrowLeftCircle,
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PlusCircleIcon,
  UserCircleIcon,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/auth/action";

const menu = [
  { id: 1, name: "Profile", path: "/user", icon: <UserCircleIcon /> },
  { id: 2, name: "Favourites", path: "saved", icon: <HeartIcon /> },
  {
    id: 3,
    name: "My Listings",
    path: "property",
    icon: <HomeIcon />,
  },
  {
    id: 4,
    name: "Add Property",
    path: "property/create",
    icon: <PlusCircleIcon />,
  },
];

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  localStorage.getItem("jwt");

  {
    /***/
  }
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  // console.log("uservv", user);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /*Sidebar  const Sidebar = (
    <div
      className={`bg-Bgpurple text-white w-56 md:w-60 h-dvh  z-10   ${
        isOpen
          ? "translate-x-0 bg-Blue absolute top-0 left-0"
          : "-translate-x-full max-lg:hidden "
      } lg:translate-x-0  transition-transform duration-300 ease-in-out  `}
    >
      <div className="px-3 py-4 flex justify-between items-center">
        <h1
          className="text-xl sm:text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          HomeSpace
        </h1>
        <button className="hidden lg:block">
          <ArrowLeftFromLineIcon className="w-6 h-6 " />
        </button>
        <button
          onClick={toggleSidebar}
          className={`hover:bg-gray-700 rounded-full p-1  text-white ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <XCircle className="w-6 h-6 " />
        </button>
      </div>
      <nav className="  flex flex-col justify-between  sm:pl-1">
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              className="p-4 hover:bg-Primary/50 flex items-center gap-3 sm:gap-4 font-medium cursor-pointer "
              onClick={() => navigate(item.path)}
            >
              <button className="w-6 h-6 ">{item.icon}</button>
              {item.name}
            </li>
          ))}
        </ul>
        <div className="fixed bottom-2 left-0 right-0 cursor-pointer">
          <span
            className="p-4 hover:bg-gray-700 flex items-center gap-2 font-normal  "
            onClick={() => navigate("/")}
          >
            <button className="w-6 h-6 ">
              <ArrowLeftCircle />
            </button>
            Logout
          </span>
        </div>
      </nav>
    </div>
  ); */

  const Sidebar = (
    <div
      className={`bg-Bgpurple text-white h-dvh z-10 ${
        isOpen
          ? "translate-x-0 bg-Blue absolute top-0 left-0"
          : "-translate-x-full max-lg:hidden"
      } 
      ${expanded ? "w-56 md:w-60" : "w-20 md:w-20"}    
      lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="px-3 py-4 flex justify-between items-center">
        <h1
          className={`font-bold cursor-pointer ${
            expanded ? "text-xl sm:text-2xl" : "hidden"
          }`}
          onClick={() => navigate("/")}
        >
          HomeSpace
        </h1>
        <button
          className="hidden lg:block"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ArrowLeftFromLineIcon className="w-6 h-6" />
          ) : (
            <ArrowRightFromLineIcon className="w-6 h-6 ml-2" />
          )}
        </button>
        <button
          onClick={toggleSidebar}
          className={`hover:bg-gray-700 rounded-full p-1 text-white ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <XCircle className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex flex-col justify-between sm:pl-1">
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              className={`hover:bg-Primary/30 mt-1 font-medium cursor-pointer transition-colors duration-200 ${
                activeItem === item.id ? "bg-Primary/50" : ""
              } ${
                expanded
                  ? "p-4 flex items-center gap-3 sm:gap-4"
                  : "p-2 pl-3 mr-1"
              }`}
              onClick={() => {
                setActiveItem(item.id); // Set the clicked item as active
                navigate(item.path);
              }}
            >
              <button className="size-7">{item.icon}</button>
              <span className={`${expanded ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-2 left-0 right-0 cursor-pointer">
          <span
            className="p-4 hover:bg-gray-700 flex items-center gap-2 font-normal"
            onClick={() => navigate("/")}
          >
            <button className="w-6 h-6">
              <ArrowLeftCircle />
            </button>
            <span className={`${expanded ? "block" : "hidden"}`}>Logout</span>
          </span>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="flex font-poppins bg-background h-dvh">
      {/*Sidebar */}
      {Sidebar}
      <div className="flex-1 flex flex-col relative z-0 w-full overflow-y-scroll overflow-x-clip">
        <header className="bg-white shadow py-2 pl-2 pr-4 flex sticky top-0 justify-between items-center z-10 ">
          <button
            onClick={toggleSidebar}
            className="lg:hidden  hover:bg-gray-100  text-slate-800  rounded-full p-2 "
          >
            <MenuIcon className="w-6 h-6 " />
          </button>

          <button className="size-10 mr-2 md:mr-4 ring ring-transparent hover:ring-inherit rounded-full bg-Primary ml-auto text-white text-xl font-medium">
            A
          </button>
        </header>

        {/*Routes */}
        <div>
          <Routes>
            <Route path="/" element={<UserProfile user={user.user} />} />
            <Route path="/saved" element={<UserFavourites />} />
            <Route path="/property" element={<UserListings />} />
            <Route path="/property/create" element={<AddProperty />} />
          </Routes>
        </div>
      </div>
      {/*Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 "
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default User;
