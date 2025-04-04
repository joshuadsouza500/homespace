import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
    <nav className=" pt-4 lg:pt-5 pb-2 lg:pb-4 px-2      md:px-4  w-full  border-b">
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] flex  pb-2 items-center justify-between mx-auto ">
        <div className="flex items-center space-x-6  max-sm: w-full ">
          <div
            className="flex items-center  justify-center space-x-1 cursor-pointer "
            onClick={() => navigate("/")}
          >
            <img
              alt="Homespace logo"
              height={24}
              width={24}
              className="size-7 max-md:size-6 "
              src="/src/assets/Logo.svg"
            />
            <span className=" text-lg md:text-xl pt-1 font-bold  text-Bgpurple">
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

          <ul className="hidden md:flex space-x-4 text-muted-foreground font-medium  w-full justify-center">
            {" "}
            <li>
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/property">Search</Link>
            </li>
            <li>
              {" "}
              <Link to="/user/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="  lg:mr-1 flex items-center space-x-2 lg:space-x-3">
          <Link to="/user/property/create">
            <Button
              variant="outline"
              className="max-sm:hidden  font-semibold border-Primary text-Primary  hover:text-Primary w-32 text-sm  max-md:h-9"
            >
              Add Property
              <PlusIcon
                strokeWidth={3}
                className="pl-1 size-3 md:size-5"
              />{" "}
            </Button>
          </Link>
          {isSigned === true ? (
            <UserDropdown handleLogout={handleLogout} user={auth.user} />
          ) : (
            <Button className="bg-Primary w-28 max-md:h-9 text-white font-semibold tracking-wide hover:bg-purple-700 ">
              <Link to={"/signup"}>Sign up</Link>
            </Button>
          )}
        </div>
      </section>
    </nav>
  );
}
