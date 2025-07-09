/* eslint-disable react/prop-types */
import {
  MapPin,
  Bath,
  Maximize,
  Wifi,
  Snowflake,
  Waves,
  DumbbellIcon,
  Fence,
  Cctv,
  Columns3,
  FlameKindling,
  Dog,
  House,
  CarFront,
  Bookmark,
  Phone,
  Mail,
  Building,
  BedDouble,
  Plug,
  WashingMachine,
} from "lucide-react";

import { Button } from "@/components/UI/ShadCN/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/ShadCN/card";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMaker from "@/components/CustomComp/LocationMaker";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createChat } from "@/store/user/action";
import { useState } from "react";
import useAuth from "@/config/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../UI/ShadCN/alert-dialog";
import PropertyGallery from "./PropertyGallery";

export default function PropertyDetails({ property, handleSave }) {
  const amenityIconMap = {
    ["Air Conditioning"]: <Snowflake className="size-5 mr-2 text-Primary" />,
    ["Parking"]: <CarFront className="size-5 mr-2 text-Primary" />,
    ["Swimming Pool"]: <Waves className="size-5 mr-2 text-Primary" />,
    ["Pool"]: <Waves className="size-5 mr-2 text-Primary" />,
    ["Laundry"]: <WashingMachine className="size-5 mr-2 text-Primary" />,
    ["Gym"]: <DumbbellIcon className="size-5 mr-2 text-Primary" />,
    ["Wifi"]: <Wifi className="size-5 mr-2 text-Primary" />,
    ["WiFi"]: <Wifi className="size-5 mr-2 text-Primary" />,
    ["Wi-Fi"]: <Wifi className="size-5 mr-2 text-Primary" />,
    ["Balcony"]: <Columns3 className="size-5 mr-2 text-Primary" />,
    ["Garden"]: <Fence className="size-5 mr-2 text-Primary" />,
    ["Security System"]: <Cctv className="size-5 mr-2 text-Primary" />,
    ["24/7 Security"]: <Cctv className="size-5 mr-2 text-Primary" />,
    ["Fireplace"]: <FlameKindling className="size-5 mr-2 text-Primary" />,
    ["Pet-Friendly"]: <Dog className="size-5 mr-2 text-Primary" />,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleMessage, setToggleMessage] = useState(false);
  const { isSignedIn, user } = useAuth();

  const handleMessage = async (otherParticipant) => {
    if (!isSignedIn) {
      // If the user is not signed in
      setToggleMessage(true);
      return;
    } else if (user.id === otherParticipant) {
      navigate("/user/property");
    } else {
      if (otherParticipant) {
        // Create the chat and get the chat details returned by the action
        const createdChat = await dispatch(createChat(otherParticipant));
        const chatId = createdChat.id;
        navigate(`/user/chat/${chatId}`);
      }
    }
  };
  const callHandleSave = async (propertyId) => {
    if (!isSignedIn) {
      // If the user is not signed in
      setToggleMessage(true);
      return;
    } else {
      await handleSave(propertyId);
    }
  };

  return (
    <div className="  mx-auto px-1 md:px-3 pt-2 md:pt-4 pb-8  ">
      {/**images */}
      {property?.image && <PropertyGallery images={property?.image} />}
      <div className="flex flex-col lg:flex-row gap-8 pt-4  md:pt-6  ">
        {/* Left column - Property details */}
        <div className="flex-1 pl-[2px] lg:pl-1">
          <div className="mb-4 md:mb-8">
            <span className=" w-full flex justify-between items-center gap-x-2 py-1 ">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-text dark:text-[#F8FDFF]  leading-snug ">
                {property?.title}
              </h1>
              <Bookmark
                data-testid="save-property-icon"
                className={`block sm:p-2 rounded-full   text-Primary size-7 md:size-11 hover:scale-[.98] cursor-pointer hover:fill-Primary/90 ${
                  property?.isSaved ? "fill-Primary" : " fill-none"
                }`}
                onClick={() => {
                  callHandleSave(property?.id);
                }}
              />
            </span>

            <div className="flex items-center text-muted-foreground mb-4 pt-1">
              <MapPin className="w-4 h-4 mr-2 text-Primary" />
              <span className="flex items-center justify-center gap-1">
                {property?.city}, {property?.governate?.replace("_", " ")}
              </span>
            </div>
            <div className="text-2xl font-bold text-Primary mb-4 ">
              ${property?.price?.toLocaleString()}{" "}
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            {/* Beds , Baths and area */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 py-4">
              <div className="flex flex-col items-center p-3 bg-muted  shadow-sm rounded-lg dark:bg-[#222222]">
                <BedDouble className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span className="font-semibold max-md:text-sm">
                  {property?.bedrooms}
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted  shadow-sm rounded-lg dark:bg-[#222222]">
                <Bath className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span className="font-semibold  max-md:text-sm">
                  {property?.bathrooms}
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted  shadow-sm rounded-lg dark:bg-[#222222]">
                <Maximize className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Area</span>
                <span className="font-semibold  max-md:text-sm">
                  {property?.area}
                </span>
              </div>
              <div className=" flex-col items-center p-3 bg-muted shadow-sm rounded-lg flex">
                <Plug className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Utilities</span>
                <span className="font-semibold  max-md:text-sm">
                  {property?.utilities}
                </span>
              </div>
            </div>
            {/* <div className="flex   md:w-[60%] items-center justify-start pb-2 md:pb-4 gap-x-4 text-text dark:text-[#F8FDFF]  font-medium   ">
              <div className="  flex items-center pl-1  border-r pr-3">
                <Bed className="size-5 mr-2 text-Primary" />
                <span className="   ">{property?.bedrooms} Bed</span>
              </div>
              <div className="flex items-center   pl-1  border-r pr-3">
                <Bath className="size-5 mr-2 text-Primary" />
                <span className="   ">{property?.bathrooms} Baths</span>
              </div>
              <div className="flex items-center pl-1">
                <Maximize className="size-5 mr-2 text-Primary" />
                <span className=" ">{property?.area} sqft</span>
              </div>
            </div> */}

            <div className="pt-2">
              <h2 className="text-xl font-semibold mb-4 text-text dark:text-[#F8FDFF] ">
                Amenities
              </h2>
              <div className="grid grid-cols-3  md:gap-x-5 gap-x-2 gap-y-6   font-medium max-sm:text-sm items-center justify-center">
                {property?.amenities?.map((am) => (
                  <div
                    className="flex items-center hover:text-Bgpurple "
                    key={am}
                  >
                    {amenityIconMap[am] || (
                      <House className="size-5 mr-2 text-Primary" /> // Default icon
                    )}
                    <p className="text-text dark:text-[#F8FDFF]  ">{am}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6  pt-2">
            <h2 className="text-xl font-semibold  mb-3 dark:text-[#F8FDFF]">
              Description
            </h2>
            <p className="text-[#4d5461] dark:text-muted-foreground tracking-wide leading-relaxed md:mr-3 text-pretty">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Right column - Agent details and Map */}
        <div className="max-md:w-[90%] max-md:mx-auto md:flex gap-x-4 lg:flex-col max-md:space-y-6 lg:space-y-6 lg:sticky lg:top-6 lg:self-start items-start ">
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={property?.user?.avatar}
                      alt="Agent photo"
                      className="object-cover rounded-full border shadow-sm"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#F8FDFF]">
                      {property?.user?.name}
                    </h4>

                    {property?.user?.role === "AGENT" ? (
                      <p className="text-sm text-muted-foreground">
                        Real Estate Agent
                      </p>
                    ) : null}

                    <div className="flex items-center mt-1">
                      <span className="text-xs ml-1 text-indigo-400">
                        View all listings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    className=" bg-indigo-600 w-full hover:bg-Primary"
                    onClick={() => {
                      handleMessage(property?.userId);
                    }}
                    data-testid="MessageAgent"
                  >
                    <Mail className="mr-2 h-4 w-4" />{" "}
                    {property?.user?.role === "AGENT"
                      ? "Message Agent"
                      : "Message User"}
                  </Button>
                  <Button
                    variant=""
                    className="w-full bg-[#01a849] hover:bg-green-700 text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Agent
                  </Button>
                </div>
                <div className="space-y-1.5  cursor-pointer hidden lg:block">
                  <div className="flex items-center hover:text-Primary dark:text-muted-foreground">
                    <Phone className="size-4   mr-2 text-muted-foreground" />
                    <span>{property?.user?.mobile}</span>
                  </div>
                  <div className="flex items-center hover:text-Primary dark:text-muted-foreground">
                    <Mail className="size-4   mr-2 text-muted-foreground" />
                    <span>{property?.user?.email}</span>
                  </div>
                  {property?.user?.role === "AGENT" ? (
                    <div className="flex items-center hover:text-Primary dark:text-muted-foreground">
                      <Building className="size-4   mr-2 text-muted-foreground" />
                      <span>{property?.user?.company}</span>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
            {/* Toggle Message */}
            <AlertDialog open={toggleMessage} onOpenChange={setToggleMessage}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign in required</AlertDialogTitle>
                  <AlertDialogDescription className="pr-4">
                    You need to be signed in to perform this action. Would you
                    like to sign in now?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Link to="/signin">
                      <Button className="w-full px-2 hover:indigo-700">
                        Sign In
                      </Button>
                    </Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Card className="md:w-[80%]  lg:w-full  lg:h-[310px] mx-auto bg-white">
            <CardContent className="p-0.5 h-full w-full">
              <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}
                className="bg-Bgpurple  z-0 h-[300px] w-full "
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMaker
                  city={property?.city}
                  image={property?.image?.length > 0 ? property.image[0] : null}
                  address={property?.address}
                  price={property?.price?.toLocaleString()}
                />
              </MapContainer>
            </CardContent>
          </Card>
          {/** <div className="flex items-center text-muted-foreground text-sm pl-1 py-1">
            <MapPin className="size-5 mr-2 text-Primary" />
            <span>{property?.address}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
