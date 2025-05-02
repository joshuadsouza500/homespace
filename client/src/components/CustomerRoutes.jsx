import { Routes, Route } from "react-router-dom";
import Footer from "./common/Footer";
import { lazy, Suspense } from "react";
import Loader from "./common/Loader";
import Navbar from "./common/Navbar";
import HomePage from "@/pages/HomePage";
import { NotFound } from "@/pages/NotFound";
import { AnimatePresence } from "motion/react";

const Search = lazy(() => import("@/pages/Search"));
const PropertyDetailsPg = lazy(() => import("@/pages/PropertyDetailsPg"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AboutPage = lazy(() => import("@/pages/About"));

const CustomerRoutes = () => {
  return (
    <div className=" w-full dark:bg-[#121212]">
      <Navbar />

      <Suspense fallback={<Loader />}>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property" element={<Search />} />
            <Route
              path="/property/:propertyId"
              element={<PropertyDetailsPg />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
