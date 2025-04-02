import {
  MoreVertical,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Sparkles,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
/***/
const BigProperyCard = ({ property }) => {
  return (
    <Card className="hidden md:block max-w-md sm:max-w-2xl md:max-w-5xl mx-1 cursor-pointer hover:shadow-m h-full">
      <div className="flex flex-col gap-1 sm:flex-row">
        <div className="relative w-full sm:w-2/5">
          <img
            src={property?.image[0]}
            alt={property?.title}
            className="w-full h-[260px] sm:h-[350px] object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none object-center "
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            {property?.type}
          </Badge>

          <div className="absolute bottom-2 left-[45%] flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full bg-white opacity-60"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4 sm:w-3/5 flex flex-col justify-between ">
          <div className="relative  h-full ">
            <div className="flex justify-between items-start mb- relative">
              <div className="space-y-1 mb-4">
                <Badge variant="secondary" className=" px-4 tracking-wide">
                  {property?.property_type}
                </Badge>
                <h2 className="text-2xl font-bold text-Primary pt-1">
                  {property?.price.toLocaleString()} BHD
                </h2>
                <h2 className="text-lg lg:text-2xl font-semibold text-text  line-clamp-1">
                  {property?.title}
                </h2>
                <div className="flex items-center text-muted-foreground text-sm pt-1">
                  <MapPin className="size-4 mr-1 text-Primary flex-shrink-0" />
                  <span>
                    {property?.city}, {property?.governate.replace("_", " ")}
                  </span>
                </div>
              </div>
              {/* Popular */}
              <span className="px-3 py-2 absolute  right-0 bg-Primary text-white font-bold text-xs rounded-lg shadow-sm flex gap-1 items-center">
                <Sparkles className="size-4 fill-white" />
                Popular this week
              </span>
            </div>

            <p className="text-muted-foreground w-[90%] text-pretty tracking-wide leading-snug line-clamp-3  mt-1">
              {property?.description}
            </p>
            <div className="flex justify-start gap-2 lg:gap-3 text-sm text-muted-foreground mb-4 pl-1 absolute bottom-0">
              <div className="flex items-center border-r-2 pr-2">
                <Bed className="size-4 mr-1 text-Primary" />
                <span>{property?.bedrooms}</span>
              </div>
              <div className="flex items-center border-r-2 pr-2">
                <Bath className="size-4 mr-1 text-Primary" />
                <span>{property?.bathrooms} </span>
              </div>
              <div className="flex items-center  pr-2">
                <Maximize className="size-4 mr-1 text-Primary" />
                <span>{property?.area} sqm</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Listed on {new Date(property?.createdAt).toLocaleDateString()}{" "}
              {/* Display listing date */}
            </span>
            <div className="flex space-x-2 items-center">
              <Button variant="outline" size="sm" className="text-primary">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <Bookmark className="h-5 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BigProperyCard;
