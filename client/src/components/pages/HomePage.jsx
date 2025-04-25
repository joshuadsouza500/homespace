import Hero from "../Homepage/Hero";
import Browse from "../Homepage/Browse";
import Testimonials from "../Homepage/Testimonials";
import Features from "../Homepage/Features";
import Slider from "../Homepage/Slider";
import HowItWorks from "../Homepage/HowItWorks";
import CTA from "../Homepage/CTA";

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
      {/* Light pink: #F0F4FD */}
      {/*   <div className="container mx-auto pb-10 md:pb-20">
        <div className="rounded-xl w-[90%] xl:w-[65%] h-80 mx-auto bg-gradient from-Bgpurple to-Primary    p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 -top-72 -right-10 bg-[url('./housey.png')] bg-no-repeat bg-center bg-cover opacity-20"></div>
          <div className="relative z-10 text-center h-full flex flex-col justify-center gap-y-2">
            <h2 className="text-4xl font-bold tracking-normal text-background1 Bgpurple -emerald-900">
              Ready to Find Your Dream Home?
            </h2>
            <p className="mt-2 text-background1/80 w-[80%] md:w-[55%] mx-auto">
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
      </div> */}
      <CTA />
    </div>
  );
};

export default HomePage;
