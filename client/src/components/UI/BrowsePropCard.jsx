/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BathIcon, BedDoubleIcon, MapPin, ScanIcon } from "lucide-react";
import { Badge } from "./ShadCN/badge";
import { CardContent } from "./ShadCN/card";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
const BrowsePropCard = ({ property, cardVariants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // Generate a random delay between 5 and 10 seconds for each card Math.random(0 - 1)
    const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    const timer = setInterval((prevIndex) => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % property?.image.length);
    }, randomDelay);
    return () => clearInterval(timer);
  }, [property?.image.length]);

  const navigate = useNavigate();

  const propertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  return (
    /* md:h-[370px] h-[390px] w-[320px] md:w-[300px] xl:w-80 */
    <motion.Card
      variants={cardVariants}
      key={property?.id}
      className=" min-w-80 max-w-sm  rounded-lg  bg-white dark:bg-[#121212] border-[0.5px] dark:border-[#49494b] [#4D4D4E] relative cursor-pointer group  hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={() => {
        propertyDetails(property?.id);
      }}
    >
      <div className="overflow-hidden w-full h-48 md:h-56 rounded-t-lg    relative ">
        <img
          src={property?.image[currentIndex]}
          alt={property?.title}
          width={400}
          height={300}
          className="object-cover object-center bg-no-repeat  h-full w-full rounded-t-lg group-hover:scale-105  transition-transform duration-500 ease-in-out "
        />

        <div className="absolute bottom-2 left-[38%] flex space-x-1 ">
          {property?.image.map((dot, index) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg- white/60"
              }`}
            />
          ))}
        </div>
      </div>
      <CardContent className=" px-4 py-3 relative ">
        <Badge
          variant="secondary"
          className="bg-estate-200 light_gray py-0.5 tracking-wide"
        >
          {property?.property_type}
        </Badge>
        <div className="flex justify-between items-center py-1 ">
          <h6 className="font-bold text-Primary flex items-center gap-[2px]  dark:text-[#F8FDFF]">
            <span className=" flex items-end gap-1 ">
              <h6 className="text-xl ">{property?.price.toLocaleString()} </h6>
              <p>BHD</p>
            </span>
            <span className="text-sm font-medium text-[#4d5461e1]">
              / month
            </span>
          </h6>
        </div>
        <h6 className="font-bold text-lg  pb-1 tracking-wide text-text line-clamp-1 dark:text-[#F8FDFF]">
          {property?.title}
        </h6>
        <p className="flex items-center gap-[2px] md:gap-1 text-sm font-medium tracking-wide text-muted-foreground pb-1">
          <MapPin className="h-4 w-4 mr-0.5 text-Primary flex-shrink-0 dark:text-muted-foreground" />
          <span>
            {property?.city}, {property?.governate.replace("_", " ")}
          </span>{" "}
        </p>
        <div className="flex justify-between items-center px-1 md:px-2 border-t mt-4 pt-3 pb-1  w-full  dark:border-t-[#49494b]">
          {/* bottom-1 absolute left-0 right-0  */}
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <BedDoubleIcon className="size-4 text-Primary dark:text-muted-foreground" />
            {property?.bedrooms} Beds
          </span>
          <span className="tracking-wide flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <BathIcon className="size-4 text-Primary dark:text-muted-foreground" />
            {property?.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <ScanIcon className="size-4 text-Primary dark:text-muted-foreground" />
            {property?.area} sqm<sup>2</sup>
          </span>
        </div>
      </CardContent>
    </motion.Card>
  );
};

export default BrowsePropCard;
