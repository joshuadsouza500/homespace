import { Routes, Route } from "react-router-dom";
import Navbar from "./ui/vo/Navbar";
import Footer from "./Footer";

import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import PropertyDetails from "./pages/PropertyDetails";
import ContactPage from "./pages/ContactPage";

const CustomerRoutes = () => {
  return (
    <div className=" w-full ">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property" element={<Search />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
