import {
  House,
  HousePlusIcon,
  IdCardIcon,
  MapPinHouseIcon,
  Star,
  StarHalf,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/ShadCN/accordion";
import { MotionHeading, MotionText } from "../UI/Animation/Motion";

const features = [
  {
    title: "Property Valuation ",
    description:
      "Get accurate and up-to-date property valuations to make informed buying, selling, or investing decisions.",
    icon: <House strokeWidth={1.5} className="text-text dark:text-[#F8FDFF]" />,
  },
  {
    title: "Verified Listings",
    description:
      "Every property on our platform is verified to ensure you get accurate, up-to-date information.",
    icon: (
      <HousePlusIcon
        strokeWidth={1.5}
        className="text-text dark:text-[#F8FDFF]"
      />
    ),
  },
  {
    title: "Security",
    description:
      "We prioritize your privacy and we have measures in place to keep your personal information secure.",
    icon: (
      <IdCardIcon strokeWidth={1.5} className="text-text dark:text-[#F8FDFF]" />
    ),
  },
  {
    title: "Transparent Pricing" /**Help find an agent */,
    description:
      "You’ll always know exactly what you’re paying for, with no unexpected costs.",
    icon: (
      <MapPinHouseIcon
        strokeWidth={1.5}
        className="text-text dark:text-[#F8FDFF]"
      />
    ),
  },
];
//
export default function Features() {
  return (
    <div className=" h-auto   py-14 0 md:py-24 bg- slate-50 [#EDF9F9] relative dark:bg-[#121212]">
      <div className="absolute inset-0  bg-[url('./bgGradient.png')]  bg-center  opacity-40 60  bg-cover bg-no-repeat  dark:hidden"></div>
      <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-start justify-items-center">
        {/* Left Side: Card with image  f7f6fc*/}

        <div className="relative h-fit w-full min-h-[350px] max-h-[550px] max-w-[550px] rounded-2xl hidden  lg:flex ">
          <img
            src="/Features.png"
            alt="Real estate professional holding a house model"
            className="w-full h-auto object-cover object-center rounded-2xl shadow-xl "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          <div className="absolute -bottom-5 bg-white rounded-xl shadow-lg py-1.5 w-40  -right-8 z-10 backdrop-blur-sm dark:bg-[#181818]">
            <span className="flex flex-col gap-y-1 text-center">
              <h5 className="text-3xl font-medium dark:text-[#F8FDFF]">4.6</h5>
              <span className="flex pt-0.5 gap-x-1 text-Primary items-center justify-center ">
                <Star className="size-[14px] fill-Primary  " />
                <Star className="size-[14px] fill-Primary  " />
                <Star className="size-[14px] fill-Primary  " />
                <Star className="size-[14px] fill-Primary  " />
                <StarHalf className="size-[14px] fill-Primary   " />
              </span>
              <p className="text-sm text-gray-700 dark:text-muted">
                500+ Reviews
              </p>
            </span>
          </div>
        </div>

        {/* Right Side: Features */}
        <section className="lg:mt-6">
          <div className="flex flex-col  max-lg:justify-center gap-y-1 pb-4 md:pb-8">
            <MotionHeading
              className=" max-lg:text-center "
              text={`Why Choose Us`}
            />

            <MotionText
              className="pl-1  max-sm:w-[80%]  max-lg:mx-auto  max-lg:text-center   max-w-lg"
              text={`Find your dream home in just a few simple steps`}
            />
          </div>

          <div className=" w-[95%]  min-w-[25rem] sm:min-w-[29rem] 2xl:min-w-[36rem] mx-auto ">
            <Accordion
              type="single"
              collapsible
              className="max-sm:w-[90%] mx-auto w-full"
            >
              {features.map((content) => (
                <AccordionItem
                  value={`item-${content.title}`}
                  key={content.title}
                  className="border-b border-b-Bgpurple/15 py-3  dark:border-b-[#F8FDFF]/20"
                >
                  <AccordionTrigger className="py-2 text-xl xl:text-2xl font-semibold text-real-dark   ">
                    <span className=" flex items-center gap-x-4 text-text dark:text-[#F8FDFF]">
                      {" "}
                      <span className=" flex items-center justify-center aspect-square size-11  rounded-md   bg-Primary/20 text-Bgpurple dark:text-[#F8FDFF]">
                        {" "}
                        {content.icon}
                      </span>
                      {content.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-pretty tracking-wider max-sm:leading-relaxed md:leading-normal text-muted-foreground  ml-16 font-normal  mr-4 max-w-sm 2xl:max-w-md  ">
                    {content.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
