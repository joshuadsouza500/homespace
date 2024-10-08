import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";
import Footer from "../Footer";
import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";
import Navbar from "../ui/vo/Navbar";

const HomePage = () => {
  return (
    <div className=" w-full ">
      {" "}
      <Navbar />
      <Hero />
      <Features />
      <Browse />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
