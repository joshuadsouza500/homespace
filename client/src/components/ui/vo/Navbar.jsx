import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { HomeIcon, PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "../UserDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/auth/action";
import { logout } from "@/store/auth/action";

//Get user.. if user exists isSigned is true and then pass logout and user to dropdown
export default function Navbar() {
  const [activeTab, setActiveTab] = useState("rent");
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
      console.log(" navbar", auth.user);
      setIsSigned(true);
    }
  }, [auth.user]);

  const handleLogout = () => {
    dispatch(logout());
    setIsSigned(false);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm max-w-7xl mx-auto">
      <div className="flex items-center space-x-6">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <HomeIcon strokeWidth={2.5} className="text-Primary" />
          <span className="text-xl font-bold text-Bgpurple">HomeSpace</span>
        </div>
        <div className="hidden md:flex space-x-2 pl-2">
          <Button
            variant={activeTab === "rent" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("rent")}
            className={`rounded-b-none   border-[#E0DEF7] w-20 font-medium hover:text-Primary border-b ${
              activeTab === "rent"
                ? "bg-purple-100  text-Primary font-bold"
                : "text-gray-600"
            }`}
          >
            Rent
          </Button>
          <Button
            variant={activeTab === "buy" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("buy")}
            className={`rounded-md  border-[#E0DEF7] w-20 font-medium hover:text-Primary ${
              activeTab === "buy"
                ? "bg-purple-100 border text-Primary font-bold"
                : "text-gray-600"
            }`}
          >
            Buy
          </Button>
        </div>
      </div>
      <div className=" lg:mr-2 flex items-center space-x-4">
        <Button
          variant="outline"
          className="font-semibold border-Primary text-Primary  hover:text-Primary"
        >
          Add Property <PlusIcon strokeWidth={3} className="pl-1 size-5" />
        </Button>
        {isSigned === true ? (
          <UserDropdown handleLogout={handleLogout} user={auth.user} />
        ) : (
          <Button className="bg-Primary text-white font-semibold tracking-wide hover:bg-purple-700">
            <Link to={"/signup"}>Sign up</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
