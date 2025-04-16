import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProperties } from "@/store/property/action";
import BrowsePropCard from "../ui/BrowsePropCard";
import { Button } from "../ui/button";
//text-[#000929]

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
    <div className="h-full  bg-[#F0F4FD] slate-50  pt-10 md:pt-16 pb-16 font-jakarta">
      <div className="flex flex-col gap-3 items-center justify-center px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl  font-bold text-[#000929]">
          Featured Properties
        </h2>
        <p className=" max-sm:text-sm  text-pretty text-[#4d5461] pb-3   mx-auto text-muted-foreground tracking-wide ">
          Here are some properties near you
        </p>
        <Tabs
          defaultValue={filters.type}
          className=" z-10  "
          onValueChange={(value) => {
            handleChange({ id: "type", value });
          }}
        >
          <TabsList className="bg-light_gray/50 h-11  w-40 md:w-56    shadow-sm ring-1  ring-bborder">
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
            <Button className="flex   px-6 py-[22px]    Bgpurple/80 text-white tracking-wide font-semibold hover:shadow-lg">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Browse;
