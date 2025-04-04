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
        {/*  <Route path="/user/*" element={<User />} />  */}
      </Routes>
    </div>
  );
}

export default App;

{
  /** THINGS TO ADD
   * Add loading screen every time api is called
   * Fix navbar li items  
   * Remove sell from selection and make it buy (Rent | Buy)
   * Have to filter for governate and cities
   * Fix bg colour
   * Add FAQ section under each Property details page faq about company or general questions.
   * Pagination to property search
   * FIgure out way to search for popular searches or recent searches
   * Fix state issue in search (clearining city when removed) & after refresh re running the search by fiiltering properties based on the saved state
  /**


  */
  /**
   * EXTRAS
   * Add number animations for mobile hero
   * Prop validation
   * Add animation for smooth transition when images are carsousel
   * Add a bit of blur to the sides of the logo slider
   * Add a loan/ mortgage calculator for specific property etc.
   *
   * Add a Booking section in property details page and then add a calendar to the user profile
   * Add property status in my propperties (active, inactive)
   * Optimizes sizes maybe dont use fixed sizes
   * Pass a variable to the carousel change and maybe pass it the index value so each card will change images at different times
   * Footer design check 22 march ss VM
   * Add google auth
   *
   * Testing.
   * Maybe integrate CI CD
   * Maybe can  add images in the chat using cloudinary to store images and return link
   */
}
