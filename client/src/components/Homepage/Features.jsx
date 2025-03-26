import {
  House,
  HousePlusIcon,
  IdCardIcon,
  MapPinHouseIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const features = [
  {
    title: "Property Insurance",
    description:
      "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
    icon: <House strokeWidth={1.5} className="text-text " />,
  },
  {
    title: "Property Valuation",
    description:
      "Get accurate and up-to-date property valuations to make informed buying, selling, or investing decisions.",
    icon: <HousePlusIcon strokeWidth={1.5} className="text-text " />,
  },
  {
    title: "Security",
    description:
      "We prioritize your privacy and we have measures in place to keep your personal information secure.",
    icon: <IdCardIcon strokeWidth={1.5} className="text-text " />,
  },
  {
    title: "Transparent Pricing" /**Help find an agent */,
    description:
      "You’ll always know exactly what you’re paying for, with no unexpected costs.",
    icon: <MapPinHouseIcon strokeWidth={1.5} className="text-text " />,
  },
];
//
export default function Main() {
  return (
    <div className="max-sm:px-2 w-full h-auto relative grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-start justify-items-center  pt-10">
      {/* Left Side: Card with image  f7f6fc*/}

      <div className="relative h-fit w-full min-h-[350px] max-h-[550px] max-w-[550px] rounded-2xl overflow-hidden  hidden  lg:flex ">
        <img
          src="/Features.png"
          alt="Real estate professional holding a house model"
          className="w-full h-full object-cover object-center rounded-2xl shadow-xl "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
      </div>

      {/*   */}
      {/* Right Side: Features */}
      <section className="lg:mt-6">
        <h2 className="text-4xl font-bold text-[#000929] max-md:text-center pb-2">
          Why Choose Us
        </h2>
        <p className="pl-1 max-sm:text-sm  text-pretty text-muted-foreground max-md:text-center tracking-wide pb-4 max-w-lg">
          Find your dream home in just a few simple steps.
        </p>
        <div className=" w-[95%] min-w-[30rem] 2xl:min-w-[36rem] mx-auto ">
          <Accordion
            type="single"
            collapsible
            className="max-sm:w-[90%] mx-auto w-full"
          >
            {features.map((content) => (
              <AccordionItem
                value={`item-${content.title}`}
                key={content.title}
                className=" border-b-Primary/15 py-3  "
              >
                <AccordionTrigger className="py-2 text-xl xl:text-2xl font-semibold text-real-dark  ">
                  <span className=" flex items-center gap-x-4 text-text ">
                    {" "}
                    <span className=" flex items-center justify-center aspect-square size-11  rounded-md   bg-Primary/20 text-Bgpurple ">
                      {" "}
                      {content.icon}
                    </span>
                    {content.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-pretty tracking-wider leading-tight text-muted-foreground  ml-16 font-medium  mr-4 max-w-sm 2xl:max-w-md  ">
                  {content.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

/*  
Left side : OLD
<div className="hidden col-span-2  lg:flex   flex-col max-w-[400px] h-[480px] rounded-lg overflow-hidden border border-[#e0def7] bg-[#fbfbfe] relative md:hidden shadow-md shadow-[#f7f6fc]">
        <div className="flex flex-col gap-4 items-start relative z-10 mt-8 ml-10 mr-2 w-[80%]">
          <h1 className="text-3xl font-bold text-text ">
            The new way to find your new home
          </h1>
          <p className="opacity-70 text-[#100a55] text-balance pb-2">
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>

          <Button className="flex w-36 h-11 bg-Bgpurple rounded-lg hover:bg-Bgpurple/80 text-white text-sm font-semibold">
            Browse Properties
          </Button>
        </div>

        <div className="w-full h-full relative z-10 ml-11 overflow-hidden">
          <div className="w-[450px] h-60 bg-[url(/House.png)] bg-cover bg-no-repeat absolute left-0 bottom-0" />
        </div>
      </div> */
