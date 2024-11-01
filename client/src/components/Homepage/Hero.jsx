import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BanknoteIcon, KeyRoundIcon, Search } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getAllProperties } from "@/store/property/action";
import { useDispatch } from "react-redux";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    pty: searchParams.get("pty") || "",
  });
  const handleFilterChange = ({ id, value }) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    // converts it into an array of key-value pairs.
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const updatedUrlParams = params.toString();
    setSearchParams(params);

    navigate(`/property?${params}`);
    dispatch(getAllProperties(updatedUrlParams));
  };

  console.log(filters);

  return (
    <div className="h-[600px]  md:h-dvh w-full pt-1 md:pt-4 md:pb-10   mx-auto ">
      <div className="hidden sm:flex h-full  max-w-full sm:bg-[url('/Hero2.png')] object-cover object-center rounded-3xl overflow-clip  flex-col justify-around items-start relative bg-no-repeat ">
        <div className="absolute h-full w-full bg-black opacity-5 z-0" />
        <div className="flex flex-col items-start   w-10/12 lg:w-6/12  gap-y-4  mt-10 ml-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-balance font-semibold z-10 font-serif tracking-wide ">
            Home Hunting{" "}
            <span className=" pt-2 flex items-center  gap-2">
              <img
                src="/oval.png"
                alt="oval house img"
                className="h-12 w-32 object-cover object-center bg-no-repeat "
              />
              Simplified.
            </span>{" "}
          </h1>

          <p className="w-8/12 ml-2  font-medium text-black/60 md:text-lg">
            Discover a hasstle-free way to buy, rent or sell properties.
          </p>
        </div>

        <section className="z-10 w-full  lg:-mt-4">
          {" "}
          <Tabs
            id="type"
            value={filters.type}
            className=" z-10  ml-8 lg:ml-16 "
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <TabsList className="bg-light_gray h-12 w-52 border-b  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7]">
              <TabsTrigger
                value="Rent"
                className="w-24 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
              >
                <KeyRoundIcon
                  strokeWidth={2.5}
                  className="size-4  text-Primary "
                />
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-24 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
              >
                <BanknoteIcon
                  strokeWidth={2.5}
                  className="size-5 text-Primary"
                />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="sm:w-full md:w-[80%] lg:w-8/12 h-24 ml-8 lg:ml-16 rounded-tl-none rounded-xl bg-white/60 backdrop-blur-sm flex justify-between px-10 items-center shadow-sm ">
            <div>
              <Label htmlFor="Location">Location</Label>
              <Input
                type="email"
                id="Location"
                placeholder="Select your city"
                className="focus-visible:ring-Bgpurple w-44 lg:w-52"
              />
            </div>

            <div className="border-l-2 pl-4">
              <p>Property Type</p>
              <Select
                id="propertyType"
                onValueChange={(value) => {
                  handleFilterChange({ id: "pty", value });
                }}
                value={filters.pty}
                className="bg-red-200"
              >
                <SelectTrigger className="md:w-[200px] w-32  max-md:h-9  ">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="pl-4">Property Type</SelectLabel>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3">
              <Button
                className="bg-Primary font-semibold w-28 md:w-32"
                onClick={applyFilters}
              >
                Find Properties
              </Button>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-[url('/Mobile3.png')] sm:hidden h-full max-w-full   object-cover object-center overflow-clip flex flex-col items-start gap-y-4 justify-start  relative bg-no-repeat ">
        <div className="absolute h-full w-full bg-black opacity-5 z-0" />
        <div className="flex flex-col items-start  gap-y-4 my-8 ">
          <h1 className="text-5xl  md:text-6xl text-center font-semibold z-10 font-serif tracking-wide w-full  text-Bgpurple">
            Home Hunting Simplified.
          </h1>

          <p className="hidden w-8/12  text-center mx-auto  font-medium text-black/60 md:text-lg">
            Discover a hasstle-free way to buy, rent or sell properties.
          </p>
        </div>

        <section className="z-10 w-full px-4 mx-auto">
          {" "}
          <Tabs defaultValue="Rent" className=" z-10   ">
            <TabsList className="bg-light_gray h-9 w-[8.5rem]  border-b  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7] ">
              <TabsTrigger
                value="Rent"
                className="w-16 flex items-center gap-1  data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold  data-[state=active]:shadow-sm shadow-Primary text-xs "
              >
                <KeyRoundIcon
                  strokeWidth={2.5}
                  className="size-4  text-Primary "
                />
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-16 flex items-center gap-1 text-xs data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold"
              >
                <BanknoteIcon
                  strokeWidth={2.5}
                  className="size-4 text-Primary"
                />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="xs:w-[95%] sm:w-[70%] w-full h-14  rounded-tl-none rounded-xl bg-light_gray/80 backdrop-blur-sm flex justify-start  px-4 items-end shadow-sm text-sm py-2 ">
            <div className=" bg-white flex rounded-l-md ">
              <Input
                type="email"
                id="Location"
                placeholder="Select your city"
                className=" xs:w-64 w-72 sm:w-80 mr-[2px] border-none focus-visible:ring-Bgpurple rounded-l-md "
              />
              <Button className="bg-Primary font-semibold p-3 rounded-l-none">
                <Search className="size-5" />
              </Button>
            </div>

            <div className=""></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
