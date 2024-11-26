import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CustomerRoutes from "./components/CustomerRoutes";
import Search from "./components/pages/Search";
import PropertyDetails from "./components/pages/PropertyDetails";
import User from "./components/pages/User";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Navbar from "./components/ui/vo/Navbar";
import Footer from "./components/Footer";
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
   * Change schema to take in governate option and then add that under title and in search and mayybe at night make location addreesss and make new props
   *
   *
   *
   */
  /**
THINGS TO ADD

2. Location map ..: Instead of location make it Address(steet name or etc) and then cn remove lat and long becuase we can get that from leaflet 
3. Fix sizes, bugs, colours
Add carousels on each pdpage and on the card
4. bg colour
5. Sorting function
6. Homescreen image
7.  chat
8. fic currency to bhd
9.Add the citiesin create property

  

  */
  /**
   * Extras
   * Chat app
   * Add a loan/ mortgage calculator for specific property etc.
   */
}
