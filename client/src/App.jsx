import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
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
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/property" element={<Search />} />
        {/*  
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
       
        
         */}
        <Route path="/user/*" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
