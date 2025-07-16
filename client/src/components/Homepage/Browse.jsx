import { Tabs, TabsList, TabsTrigger } from "@/components/UI/ShadCN/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProperties } from "@/store/property/action";
import BrowsePropCard from "../UI/BrowsePropCard";
import { Button } from "@/components/UI/ShadCN/button";
import { MotionHeading, MotionText } from "../UI/Animation/Motion";
import { motion } from "motion/react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each child by 0.2 seconds
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.7 },
    },
  };
  return (
    <div className="h-full  bg- [#F0F4FD] slate-50  pt-6 md:pt-16 pb-16 font-jakarta relative dark:bg-[#121212] ">
      {/* Background Gradient */}
      <div className="absolute inset-0  bg-[url('/bgGradient.png')]  bg-center  opacity-40 60  bg-cover bg-no-repeat rotate-180 dark:hidden" />
      <div className="flex flex-col gap-3 items-center justify-center px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto z-10 relative">
        <MotionHeading text={`Featured Properties`} />
        <MotionText
          text={`Here are some properties near you`}
          className="tracking-wide"
        />

        <Tabs
          defaultValue={filters.type}
          className=" z-10  pt-3"
          onValueChange={(value) => {
            handleChange({ id: "type", value });
          }}
        >
          <TabsList className="bg-light_gray/50 dark:bg-[#121212] h-11  w-40 md:w-56    shadow-sm ring-1  ring-bborder dark:ring-[#49494b] ">
            <TabsTrigger
              value="Rent"
              className="w-20 md:w-28  text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary "
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
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mobileBrowse w-full px-10  md:hidden   pt-12 pb-4  grid-flow-col overflow-y-auto grid   gap-x-8 gap-y-10 "
        >
          {" "}
          {Property?.properties?.properties?.slice(0, 4).map((property) => (
            <BrowsePropCard
              key={property.id}
              property={property}
              cardVariants={cardVariants}
            />
          ))}
        </motion.section>
        <motion.section
          className=" hidden w-full max-w-7xl 6xl md:grid    grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-x-10 pt-12 px-4 pb-4   "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Property?.properties?.properties?.slice(0, 6).map((property) => (
            <BrowsePropCard
              key={property.id}
              property={property}
              cardVariants={cardVariants}
            />
          ))}
        </motion.section>
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
