import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";

import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";

import Slider from "../Homepage/Slider";
import HowItWorks from "../Homepage/HowItWorks";

//change h-screen
const HomePage = () => {
  return (
    <div className=" font-jakarta   ">
      {/* px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto */}
      <Hero />
      <Slider />
      <Browse />

      <HowItWorks />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;
