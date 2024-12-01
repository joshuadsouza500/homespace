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
import SearchBar from "../ui/SearchBar";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    pty: searchParams.get("pty") || "",
    city: searchParams.get("city") || "",
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
    <>
      <MobileHero
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        handleFilterChange={handleFilterChange}
      />
      <LargeHero
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

const MobileHero = ({
  filters,
  setFilters,
  applyFilters,
  handleFilterChange,
}) => {
  return (
    <div className=" md:hidden h-auto  bg-[#E0DEF7] mt-1   pt-8 sm:pt-10 rounded-2xl mx-4 ">
      <div className="space-y-6 ">
        {/* Main Content  */}
        <div className="space-y-4 px-4 pb-2 sm:pr-20">
          <h1 className="text-balance text-5xl font-semibold z-10 font-serif tracking-wide ">
            Home Hunting Simplified
          </h1>
          <p className=" leading-snug sm:text-lg font-medium text-black/70">
            Discover a hasstle-free way to find residences that best suit your
            needs and lifestyle.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative px-4 sm:pr-20">
          <Tabs
            id="type"
            value={filters?.type}
            className=" ml-[2px] "
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <TabsList className="bg-light_gray h-10 w-40   shadow-sm ring-0 rounded-b-none ring-[#E0DEF7]">
              <TabsTrigger
                value="Rent"
                className="w-20 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
              >
                <KeyRoundIcon
                  strokeWidth={2.5}
                  className="size-4  text-Primary "
                />
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-20 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
              >
                <BanknoteIcon
                  strokeWidth={2.5}
                  className="size-5 text-Primary"
                />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            type="text"
            placeholder="Search properties in your city"
            className="h-12 sm:h-14 pl-4 pr-12 text-lg bg-white rounded-lg shadow-sm"
          />
          <button
            className="absolute hover:bg-indigo-700 right-7 sm:right-24 top-1/2 mt-[2px]  -translate-y-2/2 p-2 rounded-lg bg-Primary text-white"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 px-3 sm:pr-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-text">200+</div>
            <div className="text-sm text-black/60">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-text">10K+</div>
            <div className="text-sm text-slate-600">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-text">100+</div>
            <div className="text-sm text-slate-600">Good reviews</div>
          </div>
        </div>

        {/* Building Image */}
        <div className="relative h-60 sm:h-80 z-10  w-full overflow-hidden rounded-xl ">
          <img
            src="/Hero4.webp"
            alt="Modern apartment building"
            className="object-cover   w-full h-fit"
          />
        </div>
      </div>
    </div>
  );
};

const LargeHero = ({
  filters,
  setFilters,
  applyFilters,
  handleFilterChange,
}) => {
  return (
    <div className=" hidden md:block h-auto   w-full mt-2    mx-auto rounded-3xl   ">
      <div className="flex h-full  max-w-full bg-[url('/Hero2.png')] object-cover object-center  rounded-3xl   flex-col justify-around items-start relative bg-no-repeat pt-2 pb-16 2xl:pb-20">
        <div className="absolute h-auto w-full bg-black opacity-5 z-0 rounded-3xl" />
        <div className="flex flex-col items-start   w-9/12 lg:w-6/12  gap-y-4 2xl:gap-y-6 pb-2  mt-10 ml-6 lg:ml-12">
          <h1 className="text-6xl lg:text-7xl text-balance font-semibold z-10 font-serif tracking-wide ">
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

          <p className="w-10/12 ml-2  font-medium text-black/60 text-lg">
            Discover a hasstle-free way to find residences that best suit your
            needs and lifestyle.
          </p>
        </div>

        <section className="z-10 h-auto w-full  mt-8 xl:mt-10 max-lg:ml-1">
          {" "}
          <Tabs
            id="type"
            value={filters?.type}
            className=" z-10  ml-8 lg:ml-12 "
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <TabsList className="bg-light_gray h-12 w-52 border-b  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7]">
              <TabsTrigger
                value="Rent"
                className="w-20 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
              >
                <KeyRoundIcon
                  strokeWidth={2.5}
                  className="size-4  text-Primary "
                />
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-20 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
              >
                <BanknoteIcon
                  strokeWidth={2.5}
                  className="size-5 text-Primary"
                />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-[90%] lg:w-8/12 h-24 ml-8 lg:ml-12 rounded-tl-none rounded-xl bg-white/60 backdrop-blur-sm flex justify-between pl-4 pr-6 items-center shadow-sm ">
            <div className=" w-[90%] border-r mr-1">
              <Label htmlFor="Location">Location</Label>
              <SearchBar setFilters={setFilters} className={"md:w-[95%]"} />
            </div>

            <div className="w-full pl-3">
              <Label htmlFor="Location">Property Type</Label>
              <Select
                id="propertyType"
                onValueChange={(value) => {
                  handleFilterChange({ id: "pty", value });
                }}
                value={filters?.pty}
                className=""
              >
                <SelectTrigger className="w-[90%]   ">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="font-semibold" value={null}>
                      {" "}
                      Property Type
                    </SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Button
                className="bg-Primary font-semibold w-32 hover:bg-indigo-700"
                onClick={applyFilters}
              >
                Find Properties
              </Button>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-[url('/Mobile3.png')] sm:hidden h-full max-w-full   object-cover object-center flex flex-col items-start gap-y-4 justify-start  relative bg-no-repeat ">
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
