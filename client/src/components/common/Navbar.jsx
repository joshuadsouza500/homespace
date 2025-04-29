import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/auth/action";
import { logout } from "@/store/auth/action";
import { MenuIcon, X } from "lucide-react";
import { Button } from "../UI/ShadCN/button";
import UserDropdown from "../CustomComp/UserDropdown";

//Get user.. if user exists isSigned is true and then pass logout and user to dropdown
export default function Navbar() {
  const [isSigned, setIsSigned] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

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

  return (
    <nav className=" pt-3  lg:pt-5 pb-2 lg:pb-3   w-full  border-b">
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex  pb-2 items-center justify-between mx-auto px-3  md:px-4 relative ">
        {/* Add nabar for mobile */}
        <button
          className="md:hidden block"
          onClick={() => {
            setMobileToggle(!mobileToggle);
          }}
        >
          <MenuIcon className="size-6" />
        </button>

        <nav
          className={`md:hidden block bg-Bgpurple space-y-6 w-[75%] sm:w-[50%] shadow-2xl  fixed top-0  left-0 z-30 h-full text-background1  transition-transform  duration-300 ease-in-out  ${
            mobileToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Add something like sign in to ..... check property finder */}
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
                src="/src/assets/Logo.svg"
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
              <p className="text-muted/90 text-sm pb-4 tracking-wide  px-1">
                Sign in to save your favorite properties and stay updated on new
                listings!
              </p>
              <Button className="w-full rounded-md h-11">
                <Link to={"/signin"}>Sign In / Register</Link>
              </Button>
            </div>
          )}
          <ul className=" flex flex-col gap-y-1 px-4 text-xl font-medium  w-full justify-center  cursor-pointer ">
            {" "}
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/property">Properties</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-6   md:w-full">
          <div
            className="flex  items-center  justify-center space-x-1 cursor-pointer md:pl-1 "
            onClick={() => navigate("/")}
          >
            <img
              alt="Homespace logo"
              height={24}
              width={24}
              className="size-7 max-md:size-6 "
              src="/src/assets/Logo.svg"
            />
            <span className=" text-xl md:text-xl xl:text-2xl pt-0.5 font-bold  text-Bgpurple">
              HomeSpace
            </span>
          </div>

          <ul className="hidden md:flex space-x-4 max-xl:text-sm font-medium  w-full justify-center ">
            {" "}
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/property">Properties</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li
              className="hover:text-Primary rounded-md  font-medium  transition-colors  px-2 py-3   "
              onClick={() => setMobileToggle(false)}
            >
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4 md:gap-5 justify-center  relative ">
          {isSigned === true ? (
            <UserDropdown handleLogout={handleLogout} user={auth.user} />
          ) : (
            <Link
              to={"/signin"}
              className=" text-Bgpurple max-md:border-[0.5px] border-Bgpurple/50 rounded-md max-md:w-[70px] py-1.5  font-medium hover:text-Primary  transition-colors  w-12 text-sm   text-center dark:max-md:bg-Primary dark:text-muted "
            >
              Sign In
            </Link>
          )}

          <Button
            className="bg-Primary  hover:bg-indigo-700 px-5 hidden md:block"
            onClick={() => {
              isSigned ? navigate("/user/property/create") : setShowPopup(true);
            }}
          >
            List Property
          </Button>
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
