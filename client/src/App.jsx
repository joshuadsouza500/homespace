import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/common/Loader"; //dynamically loads when route is naigated to
import { NotFound } from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import CustomerRoutes from "./components/CustomerRoutes";
const SignIn = lazy(() => import("./pages/SignIn"));
const User = lazy(() => import("./pages/User"));

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

/* PArt 3: Animations & Dark Styles & Optimize & comments  */
{
  /**
   * THINGS TO ADD
   * STYLING:
   *
   * Add  number animations for  hero
   * Add a bit of blur to the sides of the logo slider
   * Add styles for dark theme and maybe add a toggle for it
   * Add Property add ability to add bullet points bold etc to description bar
   *
   *
   * EXTRAS:
   * For the project need to make the story match. If it is being created as a new modern verions then cant have yearsvof expiereicne etc maybe something else instead of it
   * New logo
   * Add a Booking section in property details page and then add a calendar to the user profile check windows ss
   * Add a loan/ mortgage calculator for specific property etc.
   * Optimizes sizes maybe dont use fixed sizes
   * Add google auth
   * Maybe integrate CI CD
   * Add dynamic imports for some pages const Dashboard = lazy(() => import('./Dashboard')); Can wrap them in suspense and add loading page as fallback
   *
   */
}
