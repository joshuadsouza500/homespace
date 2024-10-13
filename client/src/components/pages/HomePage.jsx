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
      <div className="w-full py-10">
        <img
          alt="banner img"
          src="/Banner1.jpeg"
          className="w-[95%] md:w-[85%] mx-auto rounded-xl lg:rounded-3xl lg:h-[90%]"
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
