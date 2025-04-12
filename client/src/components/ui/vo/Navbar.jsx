import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "../UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/auth/action";
import { logout } from "@/store/auth/action";

//Get user.. if user exists isSigned is true and then pass logout and user to dropdown
export default function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const [isSigned, setIsSigned] = useState(false);
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
    <nav className=" pt-4 lg:pt-5 pb-2 lg:pb-3   w-full  border-b">
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex  pb-2 items-center justify-between mx-auto px-2      md:px-4">
        <div className="flex items-center space-x-6  max-sm: w-full ">
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
          {/*  <div className="hidden md:flex space-x-1 pl-2">
            <Button
              variant={activeTab === "rent" ? "secondary" : "ghost"}
              onClick={() => {
                setActiveTab("rent");
                navigate("/property?type=Rent");
              }}
              className={`  w-20 font-medium border-[#E0DEF7] hover:text-Primary ${
                activeTab === "rent"
                  ? "bg-purple-100 border text-Primary font-bold"
                  : "text-black/70  "
              }`}
            >
              Rent
            </Button>
            <Button
              variant={activeTab === "sell" ? "secondary" : "ghost"}
              onClick={() => {
                setActiveTab("sell");
                navigate("/property?type=Sell");
              }}
              className={`   border-[#E0DEF7] w-20 font-medium hover:text-Primary ${
                activeTab === "sell"
                  ? " bg-purple-100 border text-Primary font-bold"
                  : "text-black/70  "
              }`}
            >
              Sell
            </Button>
          </div> */}

          <ul className="hidden md:flex space-x-4 max-xl:text-sm font-medium  w-full justify-center ">
            {" "}
            <li className="hover:text-Primary transition-colors">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-Primary transition-colors">
              {" "}
              <Link to="/property">Properties</Link>
            </li>
            <li className="hover:text-Primary transition-colors">
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-Primary transition-colors">
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4 md:gap-5 justify-center  ">
          {isSigned === true ? (
            <UserDropdown handleLogout={handleLogout} user={auth.user} />
          ) : (
            <Link
              to={"/signin"}
              className=" font-medium hover:text-Primary  transition-colors  w-12 text-sm   "
            >
              Sign In
            </Link>
          )}

          <Button className="bg-Primary  hover:bg-indigo-700">
            <Link to="/user/property/create">List Property</Link>
          </Button>
        </div>
        {/*   <div className="  lg:mr-1 flex items-center space-x-2 lg:space-x-3">
          <Link to="/user/property/create">
            <Button
              variant="outline"
              className="max-sm:hidden w-32   max-md:h-9 bg-Primary  hover:bg-indigo-700"
            >
              List Property
            
            </Button>
          </Link>
          {isSigned === true ? (
            <UserDropdown handleLogout={handleLogout} user={auth.user} />
          ) : (
            <Button className="bg-Primary w-28 max-md:h-9 text-white font-semibold tracking-wide hover:bg-purple-700 ">
              <Link to={"/signup"}>Sign up</Link>
            </Button>
          )}
        </div> */}
      </section>
    </nav>
  );
}
