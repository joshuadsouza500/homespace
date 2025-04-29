import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "@/components/User/UserProfile";
import UserFavourites from "@/components/User/SavedProp/UserFavourites";
import UserListings from "@/components/User/UserProp/UserListings";
import UserChats from "@/components/User/UserChat/UserChats";
import {
  ArrowLeftCircle,
  Bookmark,
  HomeIcon,
  MenuIcon,
  MessageCircleMore,
  PlusCircleIcon,
  UserCircleIcon,
  X,
} from "lucide-react";

import { useSelector } from "react-redux";
import UserDropdown from "@/components/CustomComp/UserDropdown";
import PropertyUpdate from "@/components/User/UserProp/propertyUpdate";
import AddProperty2 from "@/components/User/AddProperty/AddProperty2";

const menu = [
  { id: 1, name: "Profile", path: "profile", icon: <UserCircleIcon /> },
  { id: 2, name: "Chats", path: "chat", icon: <MessageCircleMore /> },
  { id: 3, name: "Saved Properties", path: "saved", icon: <Bookmark /> },
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
//Get routebfrom param to setactiveitem
const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const user = auth.user;
  const currentPath = location.pathname.split("/").pop(); // Get the last part of the path
  const currentMenuItem = menu.find((item) => item.path === currentPath)?.path;

  useEffect(() => {
    setActiveItem(currentMenuItem); // Set the active item based on the current path
  }, []); //only runs when component is mounted
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Sidebar = (
    <div
      className={`bg-Bgpurple  text-white shadow-lg backdrop-blur-md h-dvh z-10 w-56 md:w-[30%] xl:w-[22%] max-w-80 
      fixed top-0 left-0 transition-transform duration-500 ease-in-out 2xl:px-4
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:relative lg:translate-x-0
    `}
    >
      <div className="px-2 py-4 flex justify-between items-center  ">
        <div
          className={`font-bold flex justify-between gap-x-1 items-center  cursor-pointer  text-xl sm:text-2xl `}
          onClick={() => navigate("/")}
        >
          <img
            alt="Homespace logo"
            height={20}
            width={20}
            className="mr-1 -mt-0.5"
            src="/src/assets/Logo.svg"
          />

          <h2 className=" text"> HomeSpace</h2>
        </div>

        <button
          onClick={toggleSidebar}
          className={`hover:bg-gray-700 rounded-full p-1 text-white ${
            isOpen ? "visible" : "hidden"
          }`}
        >
          <X className="size-6" />
        </button>
      </div>
      <nav className="flex flex-col justify-between sm:pl-1 max-md:mt-2">
        <ul className="space-y-1 md:space-y-2">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`hover:bg-Primary/30 rounded-md  font-medium cursor-pointer transition-colors flex items-center p-3 md:p-4  gap-3 sm:gap-4  ${
                activeItem === item.path
                  ? "bg-Primary/50 border-l-4 border-Primary "
                  : ""
              } `}
              onClick={() => {
                setActiveItem(item.path); // Set the clicked item as active
                navigate(item.path);
              }}
            >
              <button className="size-7">{item.icon}</button>
              <span
                className={`transition-all block duration-500 ease-in-out 
                 `}
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
            <span className={`block`}>Home</span>
          </span>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="flex font-poppins bg-background  h-dvh z-0 justify-center w-screen  relative">
      {/*Sidebar */}
      {Sidebar}
      <div className="w-full   bg-slate-50 flex- 1 flex flex-col  z-0  overflow-y-scroll overflow-x- clip">
        {/*Nav Bar */}{" "}
        <header className="bg-white dark:bg-estate-50 shadow py-2 pl-2 pr-4 flex lg:hidden sticky top-0 justify-between   items-center z-10 ">
          <button
            onClick={toggleSidebar}
            className="lg:hidden  hover:bg-gray-100  text-slate-800  rounded-full p-2 "
          >
            <MenuIcon className="size-5 " />
          </button>

          <UserDropdown user={auth.user} />
        </header>
        {/*Routes */}
        <div className="dark:bg-[#121212]">
          <Routes>
            <Route
              path="/profile"
              element={<UserProfile auth={auth} user={user} />}
            />
            <Route path="/chat" element={<UserChats user={user} />} />
            <Route path="/chat/:chatId" element={<UserChats user={user} />} />
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

/* TODO
 * Chat view: Maybe add typing
 * Add Property:
 ** Fix the upload button bug
 */
