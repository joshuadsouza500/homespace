import "./App.css";
import { Routes, Route } from "react-router-dom";

import CustomerRoutes from "./components/CustomerRoutes";

import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";

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
  /**Change schema to take in governate option and then addp that under title and in search
THINGS TO ADD

*. Location map ..: Instead of location make it Address(steet name or etc) and then cn remove lat and long becuase we can get that from leaflet 

*Add loading something every time api is called
*fix search bar in property search
*.Add the cities and governate in create/update property and remove lat and long

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
