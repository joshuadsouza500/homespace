import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";

import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";

import Slider from "../Homepage/Slider";
import HowItWorks from "../Homepage/HowItWorks";

//change h-screen
const HomePage = () => {
  return (
    <div className=" md:px-6 xl:px-2 w-full max-w-6xl 2xl:max-w-7xl mx-auto font-jakarta">
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
