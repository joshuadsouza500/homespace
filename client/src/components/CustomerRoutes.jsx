import { Routes, Route } from "react-router-dom";
import Navbar from "./ui/vo/Navbar";
import Footer from "./Footer";
import HomePage from "./pages/HomePage";
import { lazy, Suspense } from "react";
import Loader from "./ui/vo/Loader";
import { NotFound } from "./pages/NotFound";

const Search = lazy(() => import("./pages/Search"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const CustomerRoutes = () => {
  return (
    <div className=" w-full ">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property" element={<Search />} />
          <Route path="/property/:propertyId" element={<PropertyDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
