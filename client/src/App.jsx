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
        {/*   
 
        <Navbar />
        <Route path="/" element={<HomePage />} />
        <Route path="/property" element={<Search />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Footer />
*/}
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;

{
  /**Today
   * Homescreen image
   *
  /**
THINGS TO ADD

*. Location map ..: Instead of location make it Address(steet name or etc)
*Add scroll to top when changing pages
*Add loading something every time api is called
*fix search bar in property search
*. bg colour
*. Fix sizes, bugs, colours


  

  */
  /**
   * Extras
   * Chat app
   * Add a loan/ mortgage calculator for specific property etc.
   * when clicking marker on map displays info about prop like image, address and price
   */
}
