import {
  HouseIcon,
  IdCardIcon,
  MapPinHouseIcon,
  ReceiptIcon,
} from "lucide-react";
import { Button } from "../ui/button";

const features = [
  {
    title: "Property Insurance",
    description:
      "We offer our customer property protection of liability coverage and insurance for their better life.",
    icon: <HouseIcon className="text-Bgpurple" />,
  },
  {
    title: "Best Price",
    description:
      "Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.",
    icon: <ReceiptIcon className="text-Bgpurple" />,
  },
  {
    title: "Security",
    description:
      " We prioritize your privacy and safety with encrypted transactions and secure communications.",
    icon: <IdCardIcon className="text-Bgpurple" />,
  },
  {
    title: "Overall Control",
    description:
      "Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.",
    icon: <MapPinHouseIcon className="text-Bgpurple" />,
  },
];
//
export default function Main() {
  return (
    <div className=" w-full h-auto relative overflow-hidden  grid lg:grid-cols-5 place-items-center items-stretch   font-jakarta bg-gradient-to-b from-white to-[#f7f6fc]">
      {/* Left Side: Card with image */}

      <div className="col-span-2  flex   flex-col max-w-[400px] h-[480px] rounded-lg overflow-hidden border border-[#e0def7] bg-[#f7f6fc] relative md:hidden lg:flex shadow-md shadow-[#f7f6fc]">
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
      <div className="flex-1 flex justify-between items-stretch  col-span-3 lg:mt-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full  cursor-pointer">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col  items-start  w-[90%]">
              <span className=" p-3 border-[#f7f6fc]  rounded-full border-2 bg-[#e0def7]">
                {" "}
                {item.icon}
              </span>

              <h4 className="text-2xl   font-bold text-[#000929]  pt-3 pb-2 ">
                {item.title}
              </h4>
              <p className=" items-start  max-sm:text-sm  text-pretty text-[#4d5461] pl-[2px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
