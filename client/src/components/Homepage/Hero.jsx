import { Button } from "../UI/ShadCN/button";
import { Label } from "@/components/UI/ShadCN/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/ShadCN/tabs";
import PropTypes from "prop-types";
import { BanknoteIcon, KeyRoundIcon } from "lucide-react";
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
} from "../UI/ShadCN/select";
import SearchBar from "../CustomComp/SearchBar";
import AnimatedCounter from "../UI/Animation/AnimatedCounter";
import { motion } from "motion/react";
import { MotionText } from "../UI/Animation/Motion";

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
    <section className="lg:hidden bg-[#E0DEF7]/40 m-1 mb-20 rounded-2xl">
      <div className=" rounded-2xl   relative  px-2 md:px-6  w-full  max-w-5xl  mx-auto min-h-[500px]  h-auto   pt-10 ">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center z-0 rounded-2xl bg-[url('/HomeSpaceMobile.webp')]" />
        {/* Overlay */}
        <div className="h-full w-full bg-black/5 dark:bg-black/20 -z-0 absolute inset-0 rounded-2xl" />
        <div className="gap-y-2 sm:gap-y-4 px-4 pb-1 flex flex-col items-center justify-center leading-tight relative z-10 ">
          <h1 className="text-balance leading-tight text-[40px] sm:text-5xl text-text text-center font-semibold z-10 font-serif tracking-wide  sm:w-2/3">
            Home Hunting Simplified
          </h1>
          <p className=" text-sm text-center font-medium text-black/60 w-4/6 sm:w-3/6">
            Discover a hasstle-free way to Buy , Sell or Rent your properties.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:w-[60%] gap-3 py-2 px-3"
          >
            <div className="text-center ">
              <span className="flex items-center gap-x-0.5  justify-center text-2xl font-extrabold text-text dark:text-[#374151]">
                {" "}
                <AnimatedCounter delay={0.5} number={200} /> +
              </span>

              <div className="text-xs text-slate-600 dark:text-muted-foreground">
                Properties
              </div>
            </div>
            <div className="text-center">
              <span className="flex items-center gap-x-0.5  justify-center text-2xl font-extrabold text-text dark:text-[#374151]">
                {" "}
                <AnimatedCounter delay={0.5} number={300} /> +
              </span>
              <div className="text-xs text-slate-600 dark:text-muted-foreground">
                Customers
              </div>
            </div>
            <div className="text-center">
              <span className="flex items-center gap-x-0.5  justify-center text-2xl font-extrabold text-text dark:text-[#374151]">
                {" "}
                <AnimatedCounter delay={0.5} number={100} /> +
              </span>
              <div className="text-xs text-slate-600 dark:text-muted-foreground">
                Positive reviews
              </div>
            </div>
          </motion.div>
        </div>
        {/* Search Bar */}

        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-10 p-4 bg-white rounded-md w-[90%]  sm:w-[80%] md:w-[75%] shadow-xl  dark:border-[#49494b] dark:bg-[#222222] ">
          <Tabs
            id="type"
            value={filters?.type}
            className="  bg- rounded-b-none"
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <TabsList className="bg-muted dark:bg-[#121212] white/90 h-12  ring-1  ring-[#E0DEF7] mb-2 w-full grid grid-cols-2 dark:ring-[#49494b]">
              <TabsTrigger
                value="Rent"
                className="w-auto text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold  "
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-auto  text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-semibold "
              >
                Buy
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid  md:grid-cols-2 gap-y-2.5 md:gap-y-1  md:gap-x-2 pt-1   md:justify-start ">
            <SearchBar
              setFilters={setFilters}
              className={"max-w-lg   rounded-tl-none border-t-none "}
              applyFilters={applyFilters}
              isHero={true}
            />{" "}
            <Select
              id="propertyType"
              data-testid="property-type"
              onValueChange={(value) => {
                handleFilterChange({ id: "pty", value });
              }}
              value={filters?.pty}
            >
              <SelectTrigger className="w-full text-muted-foreground  border  h-10  focus-visible:ring-[0.5px] ">
                <SelectValue
                  placeholder="Property type"
                  data-testid="property-type-selected-value"
                />
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
              data-testid="find-properties-button"
            >
              Find Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LargeHero = ({
  filters,
  setFilters,
  applyFilters,
  handleFilterChange,
}) => {
  return (
    <section className=" hidden lg:block h-auto bg-white dark:bg-[#121212]     mt-1 pt-2    pb-16 bg -estate-50  ">
      <div className=" rounded-3xl    px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-[1300px]  mx-auto">
        <div className=" flex min-h-[550px]  max-w-full max-2xl:max-h-[650px] 2xl:min-h-[600px]   bg-[url('/Hero2.png')] object-cover object-center  rounded-3xl   flex-col justify-start    items-start relative bg-no-repeat ">
          {/*  */}{" "}
          <div className="hidden dark:block absolute inset-0 h-auto w-full bg-black opacity-10 z-0 rounded-3xl" />
          <div className="flex flex-col items-start lg:w-6/12  gap-y-2  pb-2   lg:ml-12 mt-20 z-10 relative">
            <span className="overflow-hidden inline-block">
              {" "}
              <motion.h1
                initial={{ y: "80%", opacity: 0.2 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="   lg:text-7xl text-balance font-semibold  font-serif tracking-wide dark:text-[#2C2C2C] text lg:pb-1"
              >
                Home Hunting{" "}
                <span className=" pt-2 flex items-center  gap-2">
                  <img
                    src="/oval.png"
                    alt="oval house img"
                    className="h-12 w-32 object-cover object-center bg-no-repeat "
                  />
                  Simplified.
                </span>{" "}
              </motion.h1>
            </span>

            <MotionText
              className="w-10/12 ml-2  font-medium text-black/60 dark:text-[#374151] text-lg "
              text={`Discover a hasstle-free way to find residences that best suit your
              needs and lifestyle.`}
              delay={0.5}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 py-3 px-1 "
            >
              <div className="text-center ">
                <span className="flex items-center gap-x-0.5  justify-center text-3xl font-bold text-text dark:text-[#374151]">
                  {" "}
                  <AnimatedCounter delay={0.5} number={100} /> +
                </span>

                <div className="text-sm text-slate-600 dark:text-muted-foreground">
                  Properties
                </div>
              </div>
              <div className="text-center">
                <span className="flex items-center gap-x-0.5  justify-center text-3xl font-bold text-text dark:text-[#374151]">
                  {" "}
                  <AnimatedCounter delay={0.5} number={100} /> +
                </span>
                <div className="text-sm text-slate-600 dark:text-muted-foreground">
                  Customers
                </div>
              </div>
              <div className="text-center">
                <span className="flex items-center gap-x-0.5  justify-center text-3xl font-bold text-text dark:text-[#374151]">
                  {" "}
                  <AnimatedCounter delay={0.5} number={50} /> +
                </span>
                <div className="text-sm text-slate-600 dark:text-muted-foreground">
                  Positive reviews
                </div>
              </div>
            </motion.div>
          </div>
          {/* Property Search */}
          <section className="z-10 h-auto w-full    absolute bottom-12  ">
            {" "}
            <Tabs
              id="type"
              value={filters?.type}
              className="ml-2 lg:left-[6.7%] xl:left-[16.1%] absolute   tranform  bottom-0 "
              onValueChange={(value) => {
                handleFilterChange({ id: "type", value });
              }}
            >
              <TabsList className="bg-white/60 dark:bg-[#121212] h-14 w-52 border-[0.5px] border-bborder dark:border-none gap-x-[2px]  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7] ">
                <TabsTrigger
                  value="Rent"
                  className="w-24 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary "
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
                  Buy
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="w-[85%] xl:w-8/12 h-24   rounded-tl-none rounded-xl bg-gradient-to-br from-white/70 to-white/80 flex justify-between pl-4 pr-6 items-center shadow-xl backdrop-blur-sm  tranform left-1/2 absolute -translate-x-1/2 border-[0.5px] border-bborder dark:border-[#49494b]  dark:bg-gradient dark:from-[#121212]  dark:to-[#121212] ">
              <div className=" w-[90%] border-r mr-1 dark:border-[#49494b] []">
                <Label
                  className="pl-1.5 font-semibold dark:text-[#F8FDFF]"
                  htmlFor="Location"
                >
                  Location
                </Label>
                <SearchBar
                  setFilters={setFilters}
                  className={"md:w-[95%] py-1 "}
                  applyFilters={applyFilters}
                  isHero={true}
                />
              </div>

              <div className="w-full pl-3    lg:space-y-0.5">
                <Label
                  className="pl-1 font-semibold dark:text-[#F8FDFF]  "
                  htmlFor="Location"
                >
                  Property Type
                </Label>
                <Select
                  id="propertyType"
                  onValueChange={(value) => {
                    handleFilterChange({ id: "pty", value });
                  }}
                  value={filters?.pty}
                  className=" focus-visible:ring-[0.5px] py-0.5"
                >
                  <SelectTrigger className="w-[90%] text-muted-foreground    border-none bg-gray-100 h-9  font-normal focus-visible:ring-[0.5px] py-1   px-2">
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
              <div className="">
                <Button
                  className="bg-Primary font-medium text-white px-6  hover:bg-indigo-700"
                  onClick={applyFilters}
                >
                  Find Properties
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

LargeHero.propTypes = {
  filters: PropTypes.shape({
    type: PropTypes.string,
    city: PropTypes.string,
    pty: PropTypes.string,
  }),
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
MobileHero.propTypes = {
  filters: PropTypes.shape({
    type: PropTypes.string,
    city: PropTypes.string,
    pty: PropTypes.string,
  }),
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Hero;
