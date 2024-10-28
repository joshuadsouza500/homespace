import {
  House,
  HouseIcon,
  HousePlusIcon,
  IdCardIcon,
  MapPinHouseIcon,
  ReceiptIcon,
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
      "We offer our customer property protection of liability coverage and insurance for their better life.",
    icon: <House strokeWidth={2.1} className="text-text " />,
  },
  {
    title: "Property Valuation",
    description:
      "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
    icon: <HousePlusIcon strokeWidth={2.1} className="text-text " />,
  },
  {
    title: "Security",
    description:
      " We prioritize your privacy and safety with encrypted changeegegggee.",
    icon: <IdCardIcon strokeWidth={2.1} className="text-text " />,
  },
  {
    title: "INterest rates / help them buy",
    description:
      "Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.",
    icon: <MapPinHouseIcon strokeWidth={2.1} className="text-text " />,
  },
];
//
export default function Main() {
  return (
    <div className="max-sm:px-2 w-full h-auto relative   grid lg:grid-cols-5  items-stretch   font-jakarta bg-gradient-to-b from-white to-[#f7f6fc] pt-10">
      <div className="col-span-3  flex items-center py-2 justify-center md:hidden">
        <h2 className="text-4xl font-bold text-text">What we Offer</h2>
      </div>

      {/* Left Side: Card with image */}

      <div className="hidden col-span-2  lg:flex   flex-col max-w-[400px] h-[480px] rounded-lg overflow-hidden border border-[#e0def7] bg-[#f7f6fc] relative md:hidden shadow-md shadow-[#f7f6fc]">
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
      </div>

      {/* Right Side: Features */}

      <div className="hidden md:grid grid-cols-2  gap-x-1 gap-y-4 w-full  cursor-pointer  col-span-3 lg:mt-4 mx-auto py-6">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col  items-start w-[95%]">
            <div className="flex items-center justify-start gap-2 py-3  ">
              <span className=" p-[10px] border-[#f7f6fc]  rounded-full border-2 bg-[#e0def7]">
                {" "}
                {item.icon}
              </span>

              <h4 className="text-2xl   font-bold text-text  md:pt-2 pb-2 ">
                {item.title}
              </h4>
            </div>
            {/**/}{" "}
            <p className=" items-start  text-pretty text-[#4d5461] ml-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:hidden  w-[85%] sm:w-[36rem] col-span-3  mx-auto pt-10 pb-2 ">
        {" "}
        <Accordion type="single" collapsible className="w-[full]">
          {features.map((content) => (
            <AccordionItem
              value={`item-${content.title}`}
              key={content.title}
              className="font-bold border-b-Primary/15 py-1 "
            >
              <AccordionTrigger className=" text-lg   font-bold ">
                <span className=" flex items-center gap-x-2 text-text ">
                  {" "}
                  <span className=" p-[5px] bg-[#e0def7] border  rounded-full">
                    {" "}
                    {content.icon}
                  </span>
                  {content.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm font-bold text-[#4d5461] ml-8 mr-3 text-pretty">
                {content.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
