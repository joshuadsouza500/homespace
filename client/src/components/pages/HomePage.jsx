import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";

import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";
import Banner from "../Homepage/Banner";
import Slider from "../Homepage/Slider";

//change h-screen
const HomePage = () => {
  return (
    <div className=" md:px-6 w-full max-w-6xl 2xl:max-w-7xl mx-auto font-jakarta">
      {" "}
      <Hero />
      <Slider />
      <Browse />
      {/***<Features />* 
      <Testimonials />
      <Banner />*/}
    </div>
  );
};

export default HomePage;
