import { useEffect, useState } from "react";
import {
  BathIcon,
  BedDoubleIcon,
  HeartIcon,
  MapPin,
  ScanIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Popular from "../ui/vo/Popular";

const BrowsePropCard = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval((prevIndex) => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % property?.image.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [property?.image.length]);
  return (
    <div
      key={property?.id}
      className="md:h-[350px] h-[380px] w-[320px] md:w-[290px] rounded-lg border bg-white relative cursor-pointer group  hover:shadow-lg"
    >
      <div className="overflow-hidden w-full h-48 md:h-44 rounded-t-lg   relative ">
        <img
          src={property?.image[currentIndex]}
          alt={property?.title}
          className="object-cover object-center bg-no-repeat  h-full w-full rounded-t-lg group-hover:scale-105  transition-transform duration-500 ease-in-out "
        />
        {/*property?.popular != "" && (
        /* 
        make an svg for new
        <span className="px-3 py-2 absolute top-3 left-0 bg-Primary text-white font-bold text-xs rounded-r-lg shadow-sm flex gap-1 items-center">
          <Sparkles className="size-4 fill-white" />
          {property?.popular}
        </span>
        <Popular className=" absolute mt-2 -ml-2" />
     ** )**/}

        <div className="absolute bottom-2 left-[38%] flex space-x-1">
          {property?.image.map((dot, index) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="ml-3 mr-2 pt-1">
        <Badge variant="secondary" className="bg-gray-200">
          {property?.property_type}
        </Badge>
        <div className="flex justify-between items-center py-1">
          <h6 className="font-bold text-Primary flex items-center gap-[2px]">
            <span className=" flex items-end gap-1">
              <h6 className="text-xl">{property?.price} </h6>
              <p>BHD</p>
            </span>
            <span className="text-sm font-medium text-[#4d5461e1]">
              / month
            </span>
          </h6>
        </div>
        <h6 className="font-bold text-lg pb-1 text-[#000929] line-clamp-1">
          {property?.title}
        </h6>
        <p className="flex items-center gap-1 text-sm font-medium tracking-wide text-[#4d5461e1] ">
          <MapPin className="h-4 w-4 mr-1 text-Primary flex-shrink-0" />
          <span>
            {property?.city}, {property?.location}
          </span>{" "}
        </p>
        <div className="flex justify-around items-center px-2 border-t pt-4 pb-3 bottom-1 absolute w-full left-0 right-0 ">
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <BedDoubleIcon className="size-4 text-Primary" />
            {property?.bedrooms} Beds
          </span>
          <span className="tracking-wide flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <BathIcon className="size-4 text-Primary" />
            {property?.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4d5461]">
            <ScanIcon className="size-4 text-Primary" />
            {property?.area} sqm<sup>2</sup>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrowsePropCard;