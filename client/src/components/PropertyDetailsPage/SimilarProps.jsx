/* eslint-disable react/prop-types */
import {
  MoreVertical,
  Bed,
  Bath,
  MapPin,
  Bookmark,
  Scan,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/UI/ShadCN/button";
import { Card, CardContent } from "@/components/UI/ShadCN/card";
import { Badge } from "@/components/UI/ShadCN/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function SimilarProps({ className, property, cardVariants }) {
  const navigate = useNavigate();

  const propertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <motion.Card
      className={cn(
        "max-w-sm border-[0.5px] dark:border-[#49494b] rounded-lg  mx-1  cursor-pointer hover:shadow-md  ",
        className
      )}
      variants={cardVariants}
      onClick={() => {
        propertyDetails(property?.id);
      }}
    >
      <div className="flex flex-col  ">
        <div className="relative w-full ">
          <img
            src={property?.image[0]} // Use the first image from the property data
            alt={property?.title} // Use the title as the alt text for better accessibility
            width={400}
            height={300}
            className="w-full h-[200px]  object-cover rounded-t-lg "
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            {property?.type} {/* Display the property type (Rent/Sale) */}
          </Badge>
          <div className="absolute bottom-2 left-[38%] flex space-x-1">
            {property?.image.map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full bg-white opacity-60"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4  flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {property?.property_type} {/* Use property's property_type */}
                </Badge>
                <h2 className="text-2xl font-bold text-Bgpurple dark:text-[#F8FDFF]">
                  {property?.price.toLocaleString()} BHD
                </h2>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground dark:bg-[#121212] border-none dark:border-none"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 dark:text-muted text-Primary flex-shrink-0" />
              <span>
                {property?.city}, {property?.governate.replace("_", " ")}
              </span>{" "}
              {/* Use city and location */}
            </div>
            <div className="flex justify-start gap-2 md:gap-3 text-sm text-muted-foreground mb-4 pl-1 ">
              <div className="flex items-center border-r-2 pr-2 dark:border-[#49494b]">
                <Bed className="h-4 w-4 mr-1 dark:text-muted text-Primary" />
                <span>{property?.bedrooms}</span>{" "}
                {/* Use the number of bedrooms */}
              </div>
              <div className="flex items-center border-r-2 pr-2 dark:border-[#49494b]">
                <Bath className="h-4 w-4 mr-1 dark:text-muted text-Primary" />
                <span>{property?.bathrooms}</span>{" "}
                {/* Use the number of bathrooms */}
              </div>
              <div className="flex items-center pr-2">
                <Scan className="h-4 w-4 mr-1 dark:text-muted text-Primary" />
                <span>
                  {property?.area} sqm<sup>2</sup>
                </span>{" "}
                {/* Use the area */}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2 border-t gap-x-2 dark:border-t-[#222222]">
            <span className="text-[10px] sm:text-xs font-light text-muted-foreground">
              Listed on {new Date(property?.createdAt).toLocaleDateString()}{" "}
              {/* Display listing date */}
            </span>

            <div className="flex space-x-2 items-center">
              <Button
                variant="outline"
                size="sm"
                className="text-primary dark:bg-[#121212]"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-primary dark:bg-[#121212]`}
              >
                <Bookmark
                  className={`size-4 ${
                    property?.isSaved ? "fill-Primary" : " "
                  }`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </motion.Card>
  );
}
