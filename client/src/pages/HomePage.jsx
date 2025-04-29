import Browse from "@/components/Homepage/Browse";
import CTA from "@/components/Homepage/CTA";
import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/Hero";
import HowItWorks from "@/components/Homepage/HowItWorks";
import Slider from "@/components/Homepage/Slider";
import Testimonials from "@/components/Homepage/Testimonials";

//change h-screen
const HomePage = () => {
  return (
    <div className=" font-jakarta   bg-white dark:bg-[#121212]">
      {/* px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto */}
      <Hero />
      <Slider />
      <Browse />
      <HowItWorks />
      <Features />
      <Testimonials />
      {/* Light pink: #F0F4FD */}
      <CTA />
    </div>
  );
};

export default HomePage;
