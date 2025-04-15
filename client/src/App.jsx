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
        {/* */} <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;

{
  /** THINGS TO ADD
   * maybe add navbar hamburger menu for mobile
  /**



  */
  /**
   * EXTRAS
   * Add number animations for mobile hero
   * When clicking pagination smooth scroll to top
   *  Remove all implementation of status from services and redux state
   * Prop validation
   * Testing
   * Footer design check 22 march ss VM
   *
   * Add animation for smooth transition when images are carsousel
   * Add Property add ability to add bullet points bold etc to description bar
   * Add a bit of blur to the sides of the logo slider
   * Add a loan/ mortgage calculator for specific property etc.
 
  *  Add a Booking section in property details page and then add a calendar to the user profile check windows ss
   * Optimizes sizes maybe dont use fixed sizes
   * Pass a variable to the carousel change and maybe pass it the index value so each card will change images at different times
   *
   * Add google auth
   *
   * Maybe integrate CI CD
   * Maybe can  add images in the chat using cloudinary to store images and return link
   *
   *
   *
   */
}
