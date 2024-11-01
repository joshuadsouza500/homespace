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
  /**
THINGS TO ADD
1. Text searching and maybe auto complete for text.
2. Location map
3. Fix sizes, bugs, colours
4.chat
5. bg colour
6. Homescreen image
7.  
  

  */
}
