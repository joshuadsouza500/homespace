import Browse from "@/components/Homepage/Browse";
import CTA from "@/components/Homepage/CTA";
import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/Hero";
import HowItWorks from "@/components/Homepage/HowItWorks";
import Slider from "@/components/Homepage/Slider";
import Testimonials from "@/components/Homepage/Testimonials";
import { motion } from "motion/react";
import NewLogo from "../../public/NewLogo";

const HomePage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} // Fade out and slide up on exit
      transition={{ duration: 0.5 }}
      className=" font-jakarta   bg-white dark:bg-[#121212]"
    >
      <Hero />
      <Slider />
      {/*  <NewLogo />
      <div className="flex items-center w-full justify-center">
        <div className="min-w-44 relative px-4 py-2 text-center border border-Bgpurple text-Bgpurple ">
          <h2 className="font-serif text-3xl font-semibold tracking-wide">
            HomeSpace
          </h2>
          <p className="text-muted-foreground fixed bottom-0 left-0">
            est.2025
          </p>
        </div>
      </div> */}
      <Browse />
      <HowItWorks />
      <Features />
      <Testimonials />

      <CTA />
    </motion.section>
  );
};

export default HomePage;
