import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BanknoteIcon, KeyRoundIcon } from "lucide-react";
import { Button } from "../ui/button";

import { Link, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProperties } from "@/store/property/action";
import BrowsePropCard from "../ui/BrowsePropCard";
//text-[#000929]

/**
 * Add the properties from api
 * add prop type when for sale is
 * Carousel
 * Make sure properties changed when for rent or sale is clicked
 */
const Browse = () => {
  const Property = useSelector((store) => store.property);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "Rent",
  });
  const dispatch = useDispatch();
  const handleChange = ({ id, value }) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
    setSearchParams((prev) => {
      prev.set(id, value); // Modify the specific parameter
      return prev; // Return updated params to setSearchParams
    });
  };
  useEffect(() => {
    const updatedUrlParams = searchParams.toString();
    dispatch(getAllProperties(updatedUrlParams));
  }, [searchParams, dispatch]);

  return (
    <div className="h-full  bg-slate-50 estate-50 pt-6 md:pt-16 pb-8 font-jakarta">
      <div className="flex flex-col gap-3 items-center justify-center px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto">
        <h2 className="text-4xl 2xl:text-5xl font-bold text-[#000929]">
          Featured Properties
        </h2>
        <p className=" max-sm:text-sm  text-pretty text-[#4d5461] pb-3">
          Here are some properties near you
        </p>
        <Tabs
          defaultValue={filters.type}
          className=" z-10  "
          onValueChange={(value) => {
            handleChange({ id: "type", value });
          }}
        >
          <TabsList className="bg-light_gray h-12 w-44 md:w-56    shadow-sm ring-2  ring-[#E0DEF7]">
            <TabsTrigger
              value="Rent"
              className="w-20 md:w-28  text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
            >
              Rent
            </TabsTrigger>
            <TabsTrigger
              value="Sell"
              className="w-20 md:w-28 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
            >
              Buy
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <section className="mobileBrowse w-full px-10  md:hidden   pt-12 pb-4  grid-flow-col overflow-y-auto grid   gap-x-8 gap-y-10 ">
          {" "}
          {Property?.properties?.properties?.slice(0, 4).map((property) => (
            <BrowsePropCard key={property.id} property={property} />
          ))}
        </section>
        <section className=" hidden w-full max-w-6xl md:grid    grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-x-10 pt-12 px-4 pb-4   ">
          {Property?.properties?.properties?.slice(0, 6).map((property) => (
            <BrowsePropCard key={property.id} property={property} />
          ))}
        </section>
        <div className="w-full flex justify-center pt-4">
          <Link to="/property">
            <Button className="flex  h-11 bg-indigo-700 px-6  rounded-lg hover:bg-Primary Bgpurple/80 text-white text-sm tracking-wide font-semibold hover:shadow-lg">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Browse;
