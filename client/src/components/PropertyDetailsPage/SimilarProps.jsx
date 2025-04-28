/* eslint-disable react/prop-types */
import {
  MoreVertical,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/UI/ShadCN/button";
import { Card, CardContent } from "@/components/UI/ShadCN/card";
import { Badge } from "@/components/UI/ShadCN/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function SimilarProps({ className, property }) {
  const navigate = useNavigate();

  const propertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Card
      className={cn(
        "max-w-sm   mx-1  cursor-pointer hover:shadow-md  ",
        className
      )}
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
                <h2 className="text-2xl font-bold text-Bgpurple">
                  {property?.price.toLocaleString()} BHD
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 text-Primary flex-shrink-0" />
              <span>
                {property?.city}, {property?.governate.replace("_", " ")}
              </span>{" "}
              {/* Use city and location */}
            </div>
            <div className="flex justify-start gap-2 md:gap-3 text-sm text-muted-foreground mb-4 pl-1 ">
              <div className="flex items-center border-r-2 pr-2">
                <Bed className="h-4 w-4 mr-1 text-Primary" />
                <span>{property?.bedrooms}</span>{" "}
                {/* Use the number of bedrooms */}
              </div>
              <div className="flex items-center border-r-2 pr-2">
                <Bath className="h-4 w-4 mr-1 text-Primary" />
                <span>{property?.bathrooms}</span>{" "}
                {/* Use the number of bathrooms */}
              </div>
              <div className="flex items-center pr-2">
                <Maximize className="h-4 w-4 mr-1 text-Primary" />
                <span>{property?.area} sqm</span> {/* Use the area */}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2 border-t gap-x-2">
            <span className="text-xs font-light text-muted-foreground">
              Listed on {new Date(property?.createdAt).toLocaleDateString()}{" "}
              {/* Display listing date */}
            </span>

            <div className="flex space-x-2 items-center">
              <Button variant="outline" size="sm" className="text-primary">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" className={`text-primary `}>
                <Bookmark
                  className={`size-4 ${
                    property?.isSaved ? "fill-Primary" : "bg-white"
                  }`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
