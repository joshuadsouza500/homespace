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
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SearchBar from "../ui/SearchBar";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "Rent",
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
    <div className="lg:hidden min-h-[450px] sm:min-h-[500px] h-auto [400px] bg-[#E0DEF7]/40 mt-1 pt-10 rounded-2xl mx-3  relative mb-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10 rounded-2xl"
        style={{ backgroundImage: "url(/signin.png)" }}
      />
      <div className="h-full w-full bg-black/5 -z-0 absolute inset-0 rounded-2xl" />
      <div className="gap-y-2 sm:gap-y-4 px-4 pb-1 flex flex-col items-center justify-center leading-tight relative z-10 ">
        <h1 className="text-balance text-4xl sm:text-5xl  text-center font-semibold z-10 font-serif tracking-wide  sm:w-2/3">
          Home Hunting Simplified
        </h1>
        <p className=" text-center font-medium text-black/70 w-5/6 sm:w-3/6">
          Discover a hasstle-free way to Buy , Sell or Rent your properties.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:w-[60%] gap-4 py-2 px-3">
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
            <div className="text-sm text-slate-600">Reviews</div>
          </div>
        </div>
      </div>
      {/* Search Bar */}

      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-10 p-4 bg-white rounded-md w-[90%]  sm:w-[80%] md:w-[75%] shadow-xl">
        <Tabs
          id="type"
          value={filters?.type}
          className=" bg-rounded-b-none"
          onValueChange={(value) => {
            handleFilterChange({ id: "type", value });
          }}
        >
          <TabsList className="bg-muted white/90 h-12  ring-0  ring-[#E0DEF7] mb-2 w-full grid grid-cols-2">
            <TabsTrigger
              value="Rent"
              className="w-auto text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold  "
            >
              Rent
            </TabsTrigger>
            <TabsTrigger
              value="Sell"
              className="w-auto  text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold"
            >
              Buy
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="md:grid grid-cols-2 space-y-2  ">
          <SearchBar
            setFilters={setFilters}
            className={"max-w-lg h-12  rounded-tl-none border-t-none"}
            applyFilters={applyFilters}
          />

          <Select
            id="propertyType"
            onValueChange={(value) => {
              handleFilterChange({ id: "pty", value });
            }}
            value={filters?.pty}
          >
            <SelectTrigger className="w-full text-muted-foreground  border  h-10  focus-visible:ring-[0.5px] ">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex font-medium text-white justify-center ">
          <Button
            className="bg-Primary   w-[90%]   hover:bg-indigo-700 tracking-wide"
            onClick={applyFilters}
          >
            Find Properties
          </Button>
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
    <div className=" hidden lg:block h-auto   w-full mt-1    mx-auto rounded-t-3xl   pb-16 bg-estate-50">
      <div className="flex max-2xl:max-h-[600px] 2xl:min-h-[600px]  min-h-[550px]  max-w-full bg-[url('/Hero2.png')] object-cover object-center  rounded-3xl   flex-col justify-start    items-start relative bg-no-repeat ">
        <div className="absolute h-auto w-full bg-black opacity-5 z-0 rounded-3xl" />
        <div className="flex flex-col items-start lg:w-6/12  gap-y-2  pb-2   lg:ml-12 mt-20">
          <h1 className=" lg:text-7xl text-balance font-semibold z-10 font-serif tracking-wide ">
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

          <p className="w-10/12 ml-2  font-medium text-black/60 text-lg ">
            Discover a hasstle-free way to find residences that best suit your
            needs and lifestyle.
          </p>
          <div className="grid grid-cols-3 gap-4 py-4 px-1 ">
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
              <div className="text-sm text-slate-600">Positive reviews</div>
            </div>
          </div>
        </div>

        <section className="z-10 h-auto w-full    absolute bottom-12  ">
          {" "}
          <Tabs
            id="type"
            value={filters?.type}
            className="ml-2 lg:left-[6.7%] xl:left-[16%] absolute   tranform  bottom-0"
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <TabsList className="bg-white/60 h-12 w-52 border-b gap-x-[2px]  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7]">
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
          <div className="w-[85%] xl:w-8/12 h-24 m l-8 lg:m l-12 rounded-tl-none rounded-xl bg-white/60  flex justify-between pl-4 pr-6 items-center shadow-xl backdrop-blur-md tranform left-1/2 absolute -translate-x-1/2 -top- 5">
            <div className=" w-[90%] border-r mr-1 ">
              <Label className="pl-1.5" htmlFor="Location">
                Location
              </Label>
              <SearchBar
                setFilters={setFilters}
                className={"md:w-[95%]"}
                applyFilters={applyFilters}
              />
            </div>

            <div className="w-full pl-3  ">
              <Label className="pl-1 " htmlFor="Location">
                Property Type
              </Label>
              <Select
                id="propertyType"
                onValueChange={(value) => {
                  handleFilterChange({ id: "pty", value });
                }}
                value={filters?.pty}
                className=" focus-visible:ring-[0.5px]"
              >
                <SelectTrigger className="w-[90%] text-muted-foreground    border-none bg-white/10 h-9  font-normal focus-visible:ring-[0.5px] py-1   px-2">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-2">
              <Button
                className="bg-Primary font-medium text-white px-6 w -32 hover:bg-indigo-700"
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
                type="text"
                id="Location"
                placeholder="Select your city"
                className=" xs:w-64 w-72 sm:w-80 mr-[2px] border-none focus-visible:ring-Bgpurple rounded-l-md "
              />
              <Button className="bg-Primary font-semibold p-3 rounded-l-none">
                <Search className="size-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
