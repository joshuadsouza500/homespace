import { Handshake, KeyRoundIcon, Search, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const steps = [
  {
    id: 1,
    title: "Search Properties",
    desc: "Browse our extensive collection of properties filtered by your preferences.",
    icon: <Search />,
  },

  {
    id: 2,
    title: "Meet Realtor",
    desc: "Browse our extensive collection of properties filtered by your preferences.",
    icon: <User />,
  },
  {
    id: 3,
    title: "Make an Offer",
    desc: "Browse our extensive collection of properties filtered by your preferences.",
    icon: <Handshake />,
  },
  {
    id: 4,
    title: "Take the Keys",
    desc: "Browse our extensive collection of properties filtered by your preferences.",
    icon: <KeyRoundIcon />,
  },
];
const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-16 md:py-24 px-4 bg-white estate-50">
      <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">
          <div className="space-y-3 ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000929] max-lg:text-center ">
              How It Works?
            </h2>
            <p className=" max-sm:text-sm max-sm:w-[80%]  mx-auto  text-pretty text-muted-foreground max-lg:text-center tracking-wide pb-8 ">
              Find your dream home in just a few simple steps.
            </p>

            <div className="space-y-4 relative ">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 cursor-pointer rounded-l-md rounded-xl border border-gray-100 relative transition-all duration-300 hover:shadow-lg group flex items-start max-2xl:justify-between gap-x-5 2xl:gap-x-8 hover:border-l-4  hover:border-l-Primary md:w-[70%] lg:w-full  max-lg:mx-auto  ${
                    step.id === 1 && hoveredIndex !== null && hoveredIndex !== 1 //CHecks if something else is hovered
                      ? "bg-white/70"
                      : step.id === 1
                      ? "bg-white shadow-lg  border-l-4 border-l-Primary  "
                      : "bg-white/70 hover:bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIndex(step.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-icon flex items-center justify-center aspect-square size-11  rounded-md   bg-Primary/20 text-Bgpurple transition-all duration-300   group-hover:text-Primary mt-1 ">
                    {step.icon}
                  </div>
                  <div className="">
                    {" "}
                    <h3 className="text-xl font-semibold mb-1 text-real-dark">
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
              <Button className="px-5  h-11 hover:scale-[.98] bg-Bgpurple rounded-lg hover:bg-Bgpurple/80 text-white text-sm tracking-wide ">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative h-fit w-full min-h-[350px] max-h-[450px] md:max-h-[550px] rounded-2xl overflow-hidden opacity -0 animate-fade-in">
            <img
              src="/Howitworks.png"
              alt="Real estate professional holding a house model"
              className="w-full h-full object-cover object-center rounded-2xl shadow-xl "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
