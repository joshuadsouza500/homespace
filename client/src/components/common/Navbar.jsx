import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/auth/action";
import { logout } from "@/store/auth/action";
import { MenuIcon, Moon, Sun, X } from "lucide-react";
import { Button } from "../UI/ShadCN/button";
import UserDropdown from "../CustomComp/UserDropdown";

export default function Navbar() {
  const [isSigned, setIsSigned] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/property" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth.user) {
      //console.log(" navbar", auth.user);
      setIsSigned(true);
    }
  }, [auth.user]);

  const handleLogout = () => {
    dispatch(logout());
    setIsSigned(false);
  };

  //Get the current theme from local storage or check what the system prefers
  useEffect(() => {
    //parse as booleon otherwise it stores as "true or false"
    const storedTheme = JSON.parse(localStorage.getItem("theme"));

    if (storedTheme != null) {
      setDarkMode(storedTheme);
      //Checks if its true
      if (storedTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme:dark)"
      ).matches;
      setDarkMode(systemTheme);
      if (systemTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  //Get the current theme and set localStorage to the opposite of it
  const handleThemeToggle = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;

      //converts boool to string for storing
      localStorage.setItem("theme", JSON.stringify(newTheme));
      //If darkToggle is true add it to the html class
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  };

  return (
    <nav className=" pt-3  lg:pt-5 pb-2 lg:pb-3   w-full  border-b dark:border-[#4D4D4E]">
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex  pb-2 items-center justify-start md:justify-between mx-auto px-3  md:px-4 relative ">
        {/* Add nabar for mobile */}
        <button
          className="md:hidden block "
          onClick={() => {
            setMobileToggle(!mobileToggle);
          }}
        >
          <MenuIcon className="size-6 dark:text-[#f8fdff]" />
        </button>
        {/* Mobile Navbar */}
        <nav
          className={`md:hidden block bg-Bgpurple space-y-6 w-[75%] sm:w-[50%] shadow-2xl  fixed top-0  left-0 z-30 h-full text-background1  transition-transform  duration-300 ease-in-out  ${
            mobileToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <section className=" flex justify-between  items-center   border-b-[0.5px] p-4 border-light_gray/50  ">
            <div
              className="flex  items-center  justify-center space-x-1 cursor-pointer "
              onClick={() => navigate("/")}
            >
              <img
                alt="Homespace logo"
                height={24}
                width={24}
                className="max-md:size-7"
                src="./assets/Logo.svg"
              />
              <span className=" text-2xl  pt-0.5 font-bold  text-zinc-100">
                HomeSpace
              </span>
            </div>
            <button
              onClick={() => {
                setMobileToggle(!mobileToggle);
              }}
              className="rounded-full hover:bg-Primary/30 size-9 flex items-center justify-center transition-all duration-200"
            >
              <X className="size-6" />
            </button>
          </section>
          {!isSigned && (
            <div className="px-4">
              <p className="text-muted/90 text-sm pb-4 tracking-wide  px-1 dark:text-[#f8fdff]">
                Sign in to save your favorite properties and stay updated on new
                listings!
              </p>
              <Button className="w-full rounded-md h-11">
                <Link to={"/signin"}>Sign In / Register</Link>
              </Button>
            </div>
          )}
          <ul className=" flex flex-col gap-y-1 px-2  text-xl font-medium  w-full justify-center  cursor-pointer ">
            {navItems.map((navItem, index) => (
              <li
                key={index}
                className={`hover:bg-Primary/40  font-medium rounded-md transition-colors  px-2 py-3 dark:text-[#F8FDFF] ${
                  navItem.path === location.pathname ? "bg-Primary/40" : ""
                } `}
                onClick={() => setMobileToggle(false)}
              >
                {" "}
                <Link to={navItem.path}>{navItem.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center  space-x-6   md:w-full">
          <div
            className="flex  items-center  justify-center space-x-1 cursor-pointer pl-6 md:pl-1.5"
            onClick={() => navigate("/")}
          >
            <img
              alt="Homespace logo"
              height={24}
              width={24}
              className="size-5 max-md:size-[22px] lg:size-7"
              src="./assets/Logo.svg"
            />
            <span className=" text-xl md:text-xl xl:text-2xl pt-0.5 font-bold  text-Bgpurple dark:text-[#F8FDFF]">
              HomeSpace
            </span>
          </div>
          <ul className="hidden md:flex space-x-4 max-xl:text-sm font-medium  w-full  justify-center ">
            {navItems.map((navItem, index) => (
              <li
                key={index}
                className={`hover:text-Primary  font-medium  transition-colors  px-2 py-3 dark:text-[#F8FDFF] dark:hover:text-Primary ${
                  navItem.path === location.pathname ? "text-Primary" : ""
                } `}
              >
                {" "}
                <Link to={navItem.path}>{navItem.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 justify-end md:gap-5 md:justify-center   relative    max-md:w-full ">
          {isSigned === true ? (
            <UserDropdown handleLogout={handleLogout} user={auth.user} />
          ) : (
            <Link
              to={"/signin"}
              className=" text-Bgpurple max-md:border-[0.5px] border-Bgpurple/50 rounded-md max-md:w-[70px] py-1.5  font-medium hover:text-Primary dark:hover:text-Primary  transition-colors  w-12 text-sm   text-center dark:max-md:bg-Primary dark:text-[#f8fdff] "
            >
              Sign In
            </Link>
          )}

          <div className="flex items-center gap-x-1">
            {" "}
            <Button
              className="bg-Primary  hover:bg-indigo-700 px-5 hidden md:block "
              onClick={() => {
                isSigned
                  ? navigate("/user/property/create")
                  : setShowPopup(true);
              }}
            >
              List Property
            </Button>
            {/* Theme toggle */}
            <Button
              size="sm"
              variant="outline"
              className="bg-white border-none dark:border-none dark:bg-[#121212] max-md:px-2 max-md:h-8"
              onClick={handleThemeToggle}
            >
              {darkMode ? <Sun /> : <Moon />}
            </Button>
          </div>
          {/* Popup */}
          {showPopup && (
            <div className="absolute top-12 hidden  md:flex justify-between right-0 bg-red-500 text-white px-2 w-auto py-4 rounded shadow-lg z-50 gap-x-2">
              <p className="text-sm mr-4">Please sign in to list a property.</p>
              <button
                className=" text-sm underline absolute top-1.5 right-2"
                onClick={() => setShowPopup(false)} // Close the popup
              >
                <X className="text-white size-4" />
              </button>
            </div>
          )}
        </div>
        {/*Overlay */}
        {mobileToggle && (
          <div
            className="fixed inset-0 bg-black opacity-60 transition-all duration-200 ease-in z-20 "
            onClick={() => {
              setMobileToggle(!mobileToggle);
            }}
          />
        )}
      </section>
    </nav>
  );
}
