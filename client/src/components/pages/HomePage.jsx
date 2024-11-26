import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";

import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";
import Banner from "../Homepage/Banner";

//change h-screen
const HomePage = () => {
  return (
    <div className=" md:px-6 w-full max-w-6xl 2xl:max-w-7xl mx-auto font-jakarta">
      {" "}
      <Hero />
      <div className="h-32 bg-gray-300 py-2"> COmpany logos</div>
      {/**   <Features />
      <Browse />
      <Testimonials />
      <Banner />/** */}
    </div>
  );
};

export default HomePage;
