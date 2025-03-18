import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../user/UserProfile";
import UserFavourites from "../user/UserFavourites";
import UserListings from "../user/UserListings";
import UserChats from "../user/UserChats";

import {
  ArrowLeftCircle,
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleMore,
  PlusCircleIcon,
  UserCircleIcon,
  XCircle,
} from "lucide-react";
import PropertyUpdate from "../ui/vo/propertyUpdate";
import AddProperty2 from "../user/AddProperty2";
import { useSelector } from "react-redux";
import UserDropdown from "../ui/UserDropdown";

const menu = [
  { id: 1, name: "Profile", path: "/user", icon: <UserCircleIcon /> },
  { id: 2, name: "Chats", path: "chat", icon: <MessageCircleMore /> },
  { id: 3, name: "Saved Properties", path: "saved", icon: <HeartIcon /> },
  {
    id: 4,
    name: "My Properties",
    path: "property",
    icon: <HomeIcon />,
  },
  {
    id: 5,
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

  {
    /***/
  }

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
          <ArrowLeftFromLineIcon className="size-5 " />
        </button>
        <button
          onClick={toggleSidebar}
          className={`hover:bg-gray-700 rounded-full p-1  text-white ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <XCircle className="size-5 " />
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
              <button className="size-5 ">{item.icon}</button>
              {item.name}
            </li>
          ))}
        </ul>
        <div className="fixed bottom-2 left-0 right-0 cursor-pointer">
          <span
            className="p-4 hover:bg-gray-700 flex items-center gap-2 font-normal  "
            onClick={() => navigate("/")}
          >
            <button className="size-5 ">
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
      className={`bg-Bgpurple text-white h-dvh w-auto z-10 relative top-0 left-0 transition-all duration-500 ease-in-out 2xl:px-4
        ${
          isOpen
            ? "translate-x-0 bg-Bgpurple"
            : "-translate-x-full lg:translate-x-0"
        } 
        ${expanded ? "w-56 md:w-[25%]  max-w-80" : "w-20 md:w-20"}
      `}
    >
      <div className="px-3 py-4 flex justify-between items-center">
        <h1
          className={`font-bold flex justify-between gap-x-1 items-center cursor-pointer ${
            expanded ? "text-xl sm:text-2xl" : "hidden"
          }`}
          onClick={() => navigate("/")}
        >
          <img
            alt="Homespace logo"
            height={20}
            width={20}
            className="mr-1"
            src="/src/assets/Logo.svg"
          />
          HomeSpace
        </h1>
        <button
          className="hidden lg:block transition-all duration-300 ease-in-out"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ArrowLeftFromLineIcon className="size-5" />
          ) : (
            <ArrowRightFromLineIcon className="size-5 ml-2" />
          )}
        </button>
        <button
          onClick={toggleSidebar}
          className={`hover:bg-gray-700 rounded-full p-1 text-white ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <XCircle className="size-5" />
        </button>
      </div>
      <nav className="flex flex-col justify-between sm:pl-1">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`hover:bg-Primary/30  font-medium cursor-pointer transition-colors duration-300 flex items-center  ${
                activeItem === item.id ? "bg-Primary/50 " : ""
              } ${expanded ? "p-4  gap-3 sm:gap-4" : " p-2 rounded-full "}`}
              onClick={() => {
                setActiveItem(item.id); // Set the clicked item as active
                navigate(item.path);
              }}
            >
              <button className="size-7">{item.icon}</button>
              <span
                className={`transition-all duration-500 ease-in-out ${
                  expanded ? "block" : "hidden"
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-2 left-0 right-0 cursor-pointer 2xl:px-2">
          <span
            className="p-4 hover:bg-Primary/40 flex items-center gap-2 font-normal"
            onClick={() => navigate("/")}
          >
            <button className="size-5">
              <ArrowLeftCircle />
            </button>
            <span className={`${expanded ? "block" : "hidden"}`}>Home</span>
          </span>
        </div>
      </nav>
    </div>
  );
  const auth = useSelector((store) => store.auth);
  const user = auth.user;
  return (
    <div className="flex font-poppins bg-background h-dvh z-0 justify-center w-screen  ">
      {/*Sidebar */}
      {Sidebar}
      <div className="w-full   bg-background1 flex- 1 flex flex-col  z-0  overflow-y-scroll overflow-x- clip">
        {/* {" "}
        <header className="bg-white shadow py-2 pl-2 pr-4 flex sticky top-0 justify-between md:justify-end md:pr-10 items-center z-10 ">
          <button
            onClick={toggleSidebar}
            className="lg:hidden  hover:bg-gray-100  text-slate-800  rounded-full p-2 "
          >
            <MenuIcon className="size-5 " />
          </button>

          <UserDropdown user={auth.user} />
        </header>*/}
        {/*Routes */}
        <div>
          <Routes>
            <Route path="/" element={<UserProfile auth={auth} user={user} />} />
            <Route path="/chat" element={<UserChats />} />
            <Route path="/saved" element={<UserFavourites />} />
            <Route path="/property" element={<UserListings />} />
            <Route path="/property/:propertyId" element={<PropertyUpdate />} />
            <Route path="/property/create" element={<AddProperty2 />} />
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
