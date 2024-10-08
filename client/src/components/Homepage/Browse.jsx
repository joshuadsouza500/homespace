import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BanknoteIcon,
  BathIcon,
  BedDoubleIcon,
  HeartIcon,
  KeyRoundIcon,
  ScanIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Popular from "../ui/vo/Popular";
//text-[#000929]

const properties = [
  {
    id: 1,
    imageUrl: "/HomeCard.png", // Replace with actual URL
    label: "For Rent",
    popular: "POPULAR",
    price: 2400,
    location: "Faulkner Ave",
    address: "909 Woodlands St, West Riffa",
    beds: 4,
    baths: 3,
    sq: 24,
  },
  {
    id: 2,
    imageUrl: "/HomeCard2.png", // Add actual image URL
    label: "FOR SALE",
    popular: "New",
    price: 360000,
    location: "Baker St",
    address: "221B Baker St, London",
    beds: 3,
    baths: 2,
    sq: 30,
  },
  {
    id: 3,
    imageUrl: "/HomeCard3.png", // Add actual image URL
    label: "For Rent",
    popular: "POPULAR",
    price: 2100,
    location: "SpringField VL",
    address: "10 Bay Ren , SpringField",
    beds: 2,
    baths: 1,
    sq: 20,
  },
  {
    id: 4,
    imageUrl: "/HomeCard4.png", // Add actual image URL
    label: "FOR RENT",
    popular: "",
    price: 2100,
    location: "High St",
    address: "10 High St, London",
    beds: 2,
    baths: 1,
    sq: 20,
  },
  {
    id: 5,
    imageUrl:
      "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=600", // Add actual image URL
    label: "For Rent",
    popular: "",
    price: 2100,
    location: "Tarpon Bay",
    address: "10 Lake View, Austin, TX",
    beds: 2,
    baths: 1,
    sq: 20,
  },
];
const Browse = () => {
  return (
    <div className="h-full overflow-hidden  bg-gradient-to-b from-[#f7f6fc] to-white pt-28 pb-8 font-jakarta">
      <div className="flex flex-col gap-3 items-center justify-center">
        <h2 className="text-4xl font-bold text-[#000929]">
          Featured Properties
        </h2>
        <p className=" max-sm:text-sm  text-pretty text-[#4d5461] pb-3">
          Here are some properties near you
        </p>
        <Tabs defaultValue="Rent" className=" z-10  ">
          <TabsList className="bg-light_gray h-12 w-56    shadow-sm ring-2  ring-[#E0DEF7]">
            <TabsTrigger
              value="Rent"
              className="w-28 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
            >
              <KeyRoundIcon
                strokeWidth={2.5}
                className="size-4 text-Primary   "
              />
              For Rent
            </TabsTrigger>
            <TabsTrigger
              value="Sell"
              className="w-28 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
            >
              <BanknoteIcon strokeWidth={2.5} className="size-5 text-Primary" />
              To Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <section className="grid  md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-12 pb-4 ">
          {properties.map((property) => (
            <div
              key={property.id}
              className="h-[350px] w-[270px] rounded-lg border bg-white relative cursor-pointer  hover:shadow-lg"
            >
              <div
                className="w-full h-44 rounded-t-lg bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-in-out relative"
                style={{ backgroundImage: `url(${property.imageUrl})` }}
              >
                {property.popular != "" && (
                  /* 
                  make an svg for new
                  <span className="px-3 py-2 absolute top-3 left-0 bg-Primary text-white font-bold text-xs rounded-r-lg shadow-sm flex gap-1 items-center">
                    <Sparkles className="size-4 fill-white" />
                    {property.popular}
                  </span>*/
                  <Popular className=" absolute mt-2 -ml-2" />
                )}

                <HeartIcon className="p-2 right-2 absolute -bottom-5 rounded-full text-Primary size-10 ring-2 ring-Primary/50 hover:fill-Primary bg-white" />
              </div>
              <div className="ml-3 mr-2 pt-1">
                <p className="text-xs flex items-center mt-1 pl-1 text-green-600 gap-1 font-semibold">
                  <span className="size-2 bg-green-600 rounded-full" />
                  {property.label}
                </p>
                <div className="flex justify-between items-center py-1">
                  <h6 className="font-bold text-Primary text-xl flex items-center">
                    ${property.price}
                    <span className="text-sm font-medium text-[#4d5461e1]">
                      / month
                    </span>
                  </h6>
                </div>
                <h6 className="font-bold text-xl pb-1 text-[#000929]">
                  {property.location}
                </h6>
                <p className="text-sm font-medium tracking-wide text-[#4d5461e1] pl-[1px]">
                  {property.address}
                </p>
                <div className="flex justify-around items-center px-2 border-t pt-4 pb-3 bottom-1 absolute w-full left-0 right-0 ">
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
                    <BedDoubleIcon className="size-4 text-Primary" />
                    {property.beds} Beds
                  </span>
                  <span className="tracking-wide flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
                    <BathIcon className="size-4 text-Primary" />
                    {property.baths} Bathrooms
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
                    <ScanIcon className="size-4 text-Primary" />
                    {property.sq} sq<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="w-full flex justify-center pt-4">
          <Button className="flex  h-11 bg-Bgpurple rounded-lg hover:bg-Bgpurple/80 text-white text-sm tracking-wide font-semibold">
            Browse All Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
