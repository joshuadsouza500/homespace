import "./App.css";
import { Routes, Route } from "react-router-dom";

import CustomerRoutes from "./components/CustomerRoutes";

import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import User from "./components/pages/User";

function App() {
  return (
    <div className=" w-full ">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<CustomerRoutes />} />

        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;

{
  /** THINGS TO ADD
   * Fix rent and buy buttons on navbar ✔
   * Make browse properties section horizontal scroll for mobile
   * Add scroll to top when changing pages
   * Add loading something every time api is called
   * fix search bar in hero , property search
   * Fix bg colour
   * Property search search bar and options fix sizes
   * User naviagtions and user dasboard 
  /**


  */
  /**
   * Extras
   * Chat app
   * Add a loan/ mortgage calculator for specific property etc.
   * when clicking marker on map displays info about prop like image, address and price
   */
}
