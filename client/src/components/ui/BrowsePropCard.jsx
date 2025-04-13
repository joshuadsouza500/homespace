import { useEffect, useState } from "react";
import { BathIcon, BedDoubleIcon, MapPin, ScanIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "./card";

const BrowsePropCard = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval((prevIndex) => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % property?.image.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [property?.image.length]);
  return (
    /* md:h-[370px] h-[390px] w-[320px] md:w-[300px] xl:w-80 */
    <Card
      key={property?.id}
      className=" min-w-80 max-w-sm  rounded-lg border-[0.5px] bg-white relative cursor-pointer group  hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="overflow-hidden w-full h-48 md:h-52 rounded-t-lg    relative ">
        <img
          src={property?.image[currentIndex]}
          alt={property?.title}
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
          <h6 className="font-bold text-Primary flex items-center gap-[2px]  ">
            <span className=" flex items-end gap-1">
              <h6 className="text-xl">{property?.price.toLocaleString()} </h6>
              <p>BHD</p>
            </span>
            <span className="text-sm font-medium text-[#4d5461e1]">
              / month
            </span>
          </h6>
        </div>
        <h6 className="font-bold text-lg  pb-1 tracking-wide text-text line-clamp-1 ">
          {property?.title}
        </h6>
        <p className="flex items-center gap-[2px] md:gap-1 text-sm font-medium tracking-wide text-muted-foreground pb-1">
          <MapPin className="h-4 w-4 mr-0.5 text-Primary flex-shrink-0" />
          <span>
            {property?.city}, {property?.governate.replace("_", " ")}
          </span>{" "}
        </p>
        <div className="flex justify-between items-center px-1 md:px-2 border-t mt-4 pt-3 pb-1  w-full  ">
          {/* bottom-1 absolute left-0 right-0  */}
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
      </CardContent>
    </Card>
  );
};

export default BrowsePropCard;
