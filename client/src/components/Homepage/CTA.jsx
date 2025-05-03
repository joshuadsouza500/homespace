import { Button } from "../UI/ShadCN/button";

const CTA = () => {
  return (
    <div className="container mx-auto pb-10 md:pb-20 bg-white dark:bg-[#121212]">
      <div className="rounded-xl w-[90%] lg:w-[75%] xl:w-[70%] h-auto md:h-80 mx-auto bg-gradient-to-br from-Bgpurple/85 to-indigo-700 p-6 md:p-10 relative overflow-hidden shadow-lg ">
        <div className="absolute inset-0 -top-10  left-32 bg-[url('./housey.png')] bg-no-repeat bg-center bg-contain opacity -20" />
        <div className="relative z-10 text-center h-full flex flex-col justify-center gap-y-3">
          <h2 className="leading-tight text-2xl xl:text-4xl font-bold extrabold tracking-wide text-background1">
            Ready to Find Your Dream Property in Bahrain? {/*  */}
          </h2>
          <p className="w-[95%] md:w-[80%] mx-auto lg:hidden block  text-background1/80">
            Join thousands of satisfied customers who found their perfect
            property with HomeSpace.
          </p>
          <p className="mt-2 text-background1/80  md:w-[70%] mx-auto hidden lg:block">
            Join thousands of satisfied customers who found their perfect
            property with HomeSpace. Start your property journey with us!
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button className="bg-Primary text-white py-2 px-4  shadow ">
              Start Your Search
            </Button>
            <Button
              variant="outline"
              className="border-Primary text-white py-2 px-4  hover:bg-indigo-50 hover:text-indigo-700  dark:hover:text-white hidden md:block dark:bg-white/0 dark:text-white dark:hover:bg-Primary"
            >
              List Your Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
