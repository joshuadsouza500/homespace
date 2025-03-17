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
   * Add loading something every time api is called
   * User naviagtions and user dasboard 
   * Have to filter for governate and cities
   *
   * Make browse properties section horizontal scroll for mobile
   * Fix bg colour
   * Remove rent sell from navbar (maybe change and add home, search, etc)
   * Add FAQ section under each Property details page faq about company or general questions.
   * Add live chat with property owner
   * Pagination to property search
   * Add box to property search (Recent searches, popular searches , saved)
  /**


  */
  /**
   * EXTRAS
   * Add a loan/ mortgage calculator for specific property etc.
   * Prop validation
   * Add animation for smooth transition when images are carsousel
   * add a bit of blur to the sides of the logo slider
   *Add number animations for mobile hero
   * Features section complete the text and maybe change it (CHeck SS and saved maybe change the image)
   *
   * Optimizes sizes maybe dont use fixed sizes
   * Pass a variable to the carousel change and maybe pass it the index value so each card will change images at different times
   *
   *
   * Testing.
   * Maybe integrate CI CD
   */
}
