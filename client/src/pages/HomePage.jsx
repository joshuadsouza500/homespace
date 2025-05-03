import Browse from "@/components/Homepage/Browse";
import CTA from "@/components/Homepage/CTA";
import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/Hero";
import HowItWorks from "@/components/Homepage/HowItWorks";
import Slider from "@/components/Homepage/Slider";
import Testimonials from "@/components/Homepage/Testimonials";
import { motion } from "motion/react";

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
      <Browse />
      <HowItWorks />
      <Features />
      <Testimonials />

      <CTA />
    </motion.section>
  );
};

export default HomePage;
