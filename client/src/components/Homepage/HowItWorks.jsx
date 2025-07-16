import { Handshake, KeyRoundIcon, Search, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../UI/ShadCN/button";
import { MotionHeading, MotionText } from "../UI/Animation/Motion";

const steps = [
  {
    id: 1,
    title: "Search Properties",
    desc: "Explore a wide range of listings tailored to your specific needs.",
    icon: <Search />,
  },

  {
    id: 2,
    title: "Meet Realtor",
    desc: "Schedule a visit and meet the property owner in person.",
    icon: <User />,
  },
  {
    id: 3,
    title: "Make an Offer",
    desc: "Submit your best offer and start negotiating with confidence.",
    icon: <Handshake />,
  },
  {
    id: 4,
    title: "Take the Keys",
    desc: "Complete the deal and move into your dream property today.",
    icon: <KeyRoundIcon />,
  },
];
const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-12 md:py-24  bg-white   dark:bg-[#121212]">
      <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">
          <div className="space-y-1.5">
            {/*  <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-[#F8FDFF] max-lg:text-center  ">
              How It Works?
            </h2> */}
            <div className="flex flex-col max-lg:text-center gap-y-2">
              {" "}
              <MotionHeading
                text={`How It Works?`}
                className="max-lg:text-center  "
              />
              <MotionText
                text={` Find your dream home in just a few simple steps.`}
                className="  max-sm:w-[80%]  mx-auto  max-lg:text-center    "
              />
            </div>

            <div className="space-y-4 relative pt-8">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 cursor-pointer rounded-l-md rounded-xl border border-gray-100 dark:border-[#49494b] [#4D4D4E] relative transition-all duration-300 hover:shadow-lg group flex items-start  gap-x-5 xl:gap-x-6 2xl:gap-x-8 hover:border-l-4   hover:border-l-Primary md:w-[70%] lg:w-full  max-lg:mx-auto  ${
                    step.id === 1 && hoveredIndex !== null && hoveredIndex !== 1 //CHecks if something else is hovered
                      ? "bg-white/70 dark:bg-[#121212]"
                      : step.id === 1
                      ? "bg-white dark:bg-[#121212] shadow-lg  border-l-4 border-l-Primary dark:border-l-Primary "
                      : "bg-white/70 dark:bg-[#121212] dark:hover:bg-[#121212]/70 hover:bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIndex(step.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-icon flex items-center justify-center aspect-square size-11  rounded-md   bg-Primary/20 text-Bgpurple dark:text-[#F8FDFF] transition-all duration-300   group-hover:text-Primary mt-1 ">
                    {step.icon}
                  </div>
                  <div className="">
                    {" "}
                    <h3 className="text-xl font-semibold mb-1 dark:text-[#F8FDFF] ">
                      {step.title}
                    </h3>
                    <p className="tracking-wider leading-snug text-muted-foreground text-xs md:text-sm  w-full pr-1 sm:w-[90%] md:w-[85%]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 flex justify-center">
              <Button className="px-6 text-white font-medium tracking-wide ">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            {" "}
            <div className="absolute -top-3 md:-top-3 -left-2 md:-left-4 overflow-hidden size-24 bg-[#7065f0]/10 rounded-lg" />
            <div className="absolute -bottom-3 -right-1 overflow-hidden md:-bottom-4 md:-right-4  size-24 bg-[#7065f0]/10  rounded-lg" />
            <div className="relative h-fit w-full min-h-[350px] max-h-[450px] md:max-h-[550px] rounded-2xl overflow-hidden opacity -0 animate-fade-in">
              <img
                src="/Howitworks.png"
                alt="Real estate professional holding a house model"
                className="w-full h-full object-cover object-center rounded-2xl shadow-xl z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
