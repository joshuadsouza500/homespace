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
   * Add scroll to top when changing pages
   * Add loading something every time api is called
   * Fix bg colour
   * User naviagtions and user dasboard 
   * Make browse properties section horizontal scroll for mobile
   * Have to filter for givernate and cities
   * Remove rent sell frmom navbar (maybe change and add home, search, etc)
  /**


  */
  /**
   * EXTRAS
   * Chat app
   * Add a loan/ mortgage calculator for specific property etc.
   * when clicking marker on map displays info about prop like image, address and price
   * Prop validation
   * Add animation for smooth tranasisiton when images are carsousel
   * add a bit of blue to the sides of the logo slider
   *
   *
   *
   * Optimizes sizes maybe dont use fixed sizes
   */
}
