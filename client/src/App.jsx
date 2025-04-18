import "./App.css";
import { Routes, Route } from "react-router-dom";

import CustomerRoutes from "./components/CustomerRoutes";
import SignUp from "./components/pages/SignUp";
//import SignIn from "./components/pages/SignIn";
//import User from "./components/pages/User";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/vo/Loader"; //dynamically loads when route is naigated to
import { NotFound } from "./components/pages/NotFound";
const SignIn = lazy(() => import("./components/pages/SignIn"));
const User = lazy(() => import("./components/pages/User"));

function App() {
  return (
    <div className=" w-full ">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/user/*" element={<User />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

{
  /** THINGS TO ADD
  
  /**
   * EXTRAS
   * Testing
   * 
   * STYLING:
   * Add styles for dark theme
   * Add  number animations for  hero
   * When clicking pagination smooth scroll to top
   * Add Property add ability to add bullet points bold etc to description bar
   * Add a bit of blur to the sides of the logo slider
   * Pass a variable to the carousel change and maybe pass it the index value so each card will change images at different times
 
   * Add a Booking section in property details page and then add a calendar to the user profile check windows ss
   * Add a loan/ mortgage calculator for specific property etc.
   * Optimizes sizes maybe dont use fixed sizes
   * 
   * Add google auth
   * Maybe integrate CI CD 
   * Add dynamic imports for some pages const Dashboard = lazy(() => import('./Dashboard')); Can wrap them in suspense and add loading page as fallbacck
   *
   */
}
