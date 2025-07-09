/* eslint-disable react/prop-types */
import {
  MoreVertical,
  Bed,
  Bath,
  MapPin,
  Phone,
  Edit,
  Trash2,
  Bookmark,
  MessageCircle,
  Scan,
} from "lucide-react";
import { Button } from "@/components/UI/ShadCN/button";
import { Card, CardContent } from "@/components/UI/ShadCN/card";
import { Badge } from "@/components/UI/ShadCN/badge";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ShadCN/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProperty } from "@/store/property/action";
import { useEffect, useState } from "react";

export default function PropertyCard({ update, className, property, saved }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Generate a random delay between 5 and 10 seconds for each card
    const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % property.image.length);
    }, randomDelay); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [property.image]);

  const handleClick = (propertyId) => {
    navigate(`/user/property/${propertyId}`);
  };
  const handleDelete = async (propertyId) => {
    // Here you would typically send a request to delete the user account
    const message = await dispatch(deleteProperty(propertyId));

    if (message) {
      // console.log(message);
      // window.location.href = "/user/property";
      location.reload();
    }
  };
  const propertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Card
      className={cn(
        "min-w-[350px] max-w-[350px] sm:max-w-xl md:max-w-3xl mx-1 md:h-64 lg:h-[275px]   2xl:h-72 cursor-pointer hover:shadow-md  ",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row md:h-full">
        <div
          className="relative w-full sm:w-2/5  overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          onClick={() => {
            propertyDetails(property?.id);
          }}
        >
          <img
            src={property?.image[currentIndex]} // Use the first image from the property data
            alt={property?.title} // Use the title as the alt text for better accessibility
            width={400}
            height={300}
            className="w-full  transition-transform duration-300 hover:scale-[1.02] h-[200px] sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          />
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            {property?.type} {/* Display the property type (Rent/Sale) */}
          </Badge>
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
        <CardContent className="px-4 py-2 sm:w-3/5 flex flex-col justify-between ">
          <div
            onClick={() => {
              propertyDetails(property?.id);
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-2 px-4 py-0.5 bg-estate-100 tracking-wide dark:bg-[#222222] dark:text-[#F8FDFF]"
                >
                  {property?.property_type} {/* Use property's property_type */}
                </Badge>
                <h2 className="text-2xl font-bold text-Bgpurple dark:text-white">
                  {property?.price.toLocaleString()} BHD
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`text-text dark:bg-[#121212] `}
              >
                <Bookmark
                  className={`size-5 lg:size-6 text-Primary/50  ${
                    property?.isSaved
                      ? "fill-Primary"
                      : "text-gray-700 dark:text-muted"
                  }`}
                />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4 xl:pt-2">
              <MapPin className="h-4 w-4 mr-1.5 text-Primary dark:text-muted flex-shrink-0" />
              <span>
                {property?.city}, {property?.governate.replace("_", " ")}
              </span>{" "}
              {/* Use city and location */}
            </div>
            <div className="flex justify-start gap-2 text-sm text-muted-foreground mb-4 pl-1">
              <div className="flex items-center border-r-2 pr-2 dark:border-r-[#222222]">
                <Bed className="h-4 w-4 mr-1.5 text-Primary dark:text-muted" />
                <span>{property?.bedrooms}</span>{" "}
                {/* Use the number of bedrooms */}
              </div>
              <div className="flex items-center border-r-2 pr-2 dark:border-r-[#222222]">
                <Bath className="h-4 w-4 mr-1.5 text-Primary dark:text-muted" />
                <span>{property?.bathrooms}</span>{" "}
                {/* Use the number of bathrooms */}
              </div>
              <div className="flex items-center pr-2">
                <Scan className="h-4 w-4 mr-1.5 text-Primary dark:text-muted" />
                <span>
                  {property?.area} sqm<sup>2</sup>
                </span>{" "}
                {/* Use the area */}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2 border-t dark:border-t-[#222222]">
            <span className="text-[10px] sm:text-xs font-light text-muted-foreground  ">
              Listed {new Date(property?.createdAt).toLocaleDateString()}{" "}
              {/* Display listing date */}
            </span>
            {update ? (
              <div className="flex space-x-4 items-center ">
                <button
                  className="text-Bgpurple dark:text-[#F8FDFF]  hover:text-Primary  flex items-center gap-1 md:gap-2 max-sm:text-sm"
                  onClick={() => {
                    handleClick(property?.id); // Use the actual property ID
                  }}
                >
                  <Edit className="h-4 w-4 " />
                  Edit
                </button>

                {/* Delete button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-red-600 hover:text-red-800 flex items-center gap-1 md:gap-2 max-sm:text-sm">
                      <Trash2 className="size-4 " />
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete your Property Listing?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your property listing and remove it from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600"
                        onClick={() => {
                          handleDelete(property?.id);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="flex space-x-2  items-center  ">
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-primary  dark:bg-[#121212] ${
                    saved ? "xl:hidden 2xl:flex" : ""
                  }`}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary dark:bg-[#121212]"
                >
                  <MessageCircle className="h-4 w-4  mr-1" />
                  Message
                </Button>
                {/*  <Button
                  variant="outline"
                  size="sm"
                  className={`text-text dark:bg-[#121212]`}
                >
                  <Bookmark
                    className={`size-4 lg:size-5 text-Primary/50  ${
                      property?.isSaved
                        ? "fill-Primary"
                        : "text-gray-700 dark:text-muted"
                    }`}
                  />
                </Button> */}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

{
  /**
  
Villa:https://ssl.cdn-redfin.com/photo/92/islphoto/143/genIslnoResize.8571143_0.jpg
Outisde:https://ssl.cdn-redfin.com/photo/92/islphoto/143/genIslnoResize.8571143_28_0.jpg
interior:https://ssl.cdn-redfin.com/photo/92/islphoto/143/genIslnoResize.8571143_4_0.jpg
kitchen:https://ssl.cdn-redfin.com/photo/92/islphoto/143/genIslnoResize.8571143_6_0.jpg
/***************

Villa:https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_35_1.jpg
Outisde:https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_4_1.jpg
interior:https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_1.jpg
kitchen:https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_12_1.jpg 
https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_15_1.jpg
************

Villa:https://ssl.cdn-redfin.com/photo/92/islphoto/486/genIslnoResize.1116486_2.jpg
Outisde:https://ssl.cdn-redfin.com/photo/92/islphoto/486/genIslnoResize.1116486_16_2.jpg
interior:https://ssl.cdn-redfin.com/photo/92/islphoto/604/genIslnoResize.5806604_4_1.jpg
kitchen:https://ssl.cdn-redfin.com/photo/92/islphoto/486/genIslnoResize.1116486_5_2.jpg
**********************

interior images:
1.https://ssl.cdn-redfin.com/photo/92/islphoto/729/genIslnoResize.9258729_2_0.jpg
2.https://ssl.cdn-redfin.com/photo/92/islphoto/729/genIslnoResize.9258729_11_0.jpg
3.https://ssl.cdn-redfin.com/photo/92/islphoto/794/genIslnoResize.5762794_4_0.jpg
4.https://ssl.cdn-redfin.com/photo/92/islphoto/231/genIslnoResize.9679231_0.jpg
5.https://ssl.cdn-redfin.com/photo/92/islphoto/332/genIslnoResize.1089332_0.jpg
6.https://ssl.cdn-redfin.com/photo/92/islphoto/272/genIslnoResize.8732272_0.jpg
4.https://ssl.cdn-redfin.com/photo/40/islphoto/747/genIslnoResize.24-467747_0.jpg
5.https://ssl.cdn-redfin.com/photo/40/islphoto/747/genIslnoResize.24-467747_6_0.jpg
6.https://ssl.cdn-redfin.com/photo/45/islphoto/451/genIslnoResize.SR24232451_1_2.jpg
4.https://ssl.cdn-redfin.com/photo/45/islphoto/974/genIslnoResize.OC24229974_3_0.jpg


.
kitchen 
https://ssl.cdn-redfin.com/photo/92/islphoto/332/genIslnoResize.1089332_11_0.jpg
https://ssl.cdn-redfin.com/photo/92/islphoto/362/genIslnoResize.3605362_3_0.jpg
https://ssl.cdn-redfin.com/photo/45/islphoto/379/genIslnoResize.SB24241379_1_1.jpg


main:
https://ssl.cdn-redfin.com/photo/92/islphoto/185/genIslnoResize.8681185_0.jpg
https://ssl.cdn-redfin.com/photo/92/islphoto/627/genIslnoResize.1002627_1.jpg
https://ssl.cdn-redfin.com/photo/92/islphoto/077/genIslnoResize.8695077_0.jpg  
 
apartment building:
https://ssl.cdn-redfin.com/photo/45/islphoto/271/genIslnoResize.DW24215271_2.jpg
  https://photos.zillowstatic.com/fp/6be40e51d562a48a01145be369e7468d-p_e.webp
  https://photos.zillowstatic.com/fp/ef15362deef0500527a1ae8fb479d117-p_e.webp



  big apartment outside
  https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800
  https://images.pexels.com/photos/3663530/pexels-photo-3663530.jpeg?auto=compress&cs=tinysrgb&w=800
  https://images.pexels.com/photos/1031593/pexels-photo-1031593.jpeg?auto=compress&cs=tinysrgb&w=800
*/
}
