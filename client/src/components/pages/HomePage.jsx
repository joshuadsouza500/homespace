import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";

import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";

import Slider from "../Homepage/Slider";
import HowItWorks from "../Homepage/HowItWorks";
import { Button } from "../ui/button";

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
      <section className="py-10 md:py-16 ">
        <div className="container mx-auto ">
          <div className="rounded-xl w-[90%] mx-auto bg-purple-50 p-8 md:p-10 ">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-Bgpurple -emerald-900">
                Ready to Find Your Dream Home?
              </h2>
              <p className="mt-2 text-emerald-800 w-[90%] md:w-[85%] mx-auto">
                Join thousands of satisfied customers who found their perfect
                property with HomeSpace.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <Button className="bg-Primary hover:bg-indigo-700">
                  Start Your Search
                </Button>
                <Button
                  variant="outline"
                  className="border-Primabg-Primary text-Primabg-Primary hover:bg-indigo-50"
                >
                  List Your Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
