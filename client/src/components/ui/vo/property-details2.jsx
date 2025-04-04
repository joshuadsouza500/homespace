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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMaker from "@/components/LocationMaker";
import PropertyGallery from "./PropertyGallery";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createChat } from "@/store/user/action";

{
  /** <div className="flex flex-col md:flex-row gap-4 h-[500px] ">
        <div className=" relative  bg-orange-200 w-[75%] ">
          <img
            src="https://media.gettyimages.com/id/496649791/photo/beautiful-country-estate.jpg?s=612x612&w=gi&k=20&c=S9rzVEAVSdDfLHFTP5JC9INQ50xD4CeW9fc4ZN3V8Go="
            alt="Property main img"
            className="rounded-lg object-cover object-center h-full w-full "
          />
          <Button variant="secondary" className="absolute top-4 left-4">
            Virtual Tour
          </Button>
        </div>
        <div className="md:w-[25%]  flex flex-row md:flex-col ">
          <div className="w-1/2 md:w-full  relative aspect-square">
            <img
              src="/HomeCard2.png"
              alt="Property img 1"
              className="rounded-lg object-cover object-center aspect-square p-4"
            />
          </div>
          <div className="w-1/2 md:w-full relative aspect-square ">
            <div className="bg-black opacity-70 h-full w-full absolute" />

            <img
              src="/HomeCard3.png"
              alt="Property img 2"
              className="rounded-sm object-cover object-center aspect-square  "
            />
          </div>
        </div>
      </div> */
}

export default function PropertyDetails2({ property, handleSave }) {
  console.log("pp", property);
  const amenityIconMap = {
    ["Air Conditioning"]: <Snowflake className="size-5 mr-2 text-Primary" />,
    ["Parking"]: <CarFront className="size-5 mr-2 text-Primary" />,
    "Swimming Pool": <Waves className="size-5 mr-2 text-Primary" />,
    ["Gym"]: <DumbbellIcon className="size-5 mr-2 text-Primary" />,
    ["Wifi"]: <Wifi className="size-5 mr-2 text-Primary" />,
    ["Balcony"]: <Columns3 className="size-5 mr-2 text-Primary" />,
    ["Garden"]: <Fence className="size-5 mr-2 text-Primary" />,
    ["Security System"]: <Cctv className="size-5 mr-2 text-Primary" />,
    ["Fireplace"]: <FlameKindling className="size-5 mr-2 text-Primary" />,
    ["Pet-Friendly"]: <Dog className="size-5 mr-2 text-Primary" />,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMessage = async (otherParticipant) => {
    if (otherParticipant) {
      // Create the chat and get the chat details returned by the action
      const createdChat = await dispatch(createChat(otherParticipant));
      const chatId = createdChat.id;
      navigate(`/user/chat/${chatId}`);
    }
  };

  return (
    <div className="  mx-auto px-1 md:px-3 pt-2 md:pt-4 pb-8  ">
      {/**images */}
      {property?.image && <PropertyGallery images={property?.image} />}

      {/**  <div className="w-full grid lg:grid-cols-5 gap-5">
        <div className="col-span-4 md:aspect-video">
          <img
            src={property?.image[0] || "https://via.placeholder.com/800x400"}
            alt="Property main"
            className="rounded-md object-cover object-center w-full h-full"
          />
        </div>

        <div className="col-span-1 lg:flex flex-col gap-3 hidden items-center">
          {property?.image.slice(1, 3).map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Property img ${index + 2}`}
                className="rounded-sm object-cover object-center aspect-square"
              />
            </div>
          ))}

          {property?.image.length > 3 && (
            <div className="relative">
              <div className="bg-black opacity-70 h-full w-full absolute flex justify-center items-center">
                <h6 className="text-white">View All</h6>
              </div>
              <img
                src={property?.image[2] || "/HomeCard3.png"}
                alt="Property img 3"
                className="rounded-sm object-cover object-center aspect-square"
              />
            </div>
          )}
        </div>
      </div>
 */}
      <div className="flex flex-col lg:flex-row gap-8 pt-4  md:pt-6  ">
        {/* Left column - Property details */}
        <div className="flex-1 pl-[2px] lg:pl-1">
          <div className="mb-4 md:mb-8">
            <span className=" w-full flex justify-between items-center  py-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-text leading-snug ">
                {property?.title}
              </h1>
              <Bookmark
                className={`block p-2 rounded-full ring-[0.2px] ring-bborder shadow-sm text-Primary size-11 hover:scale-95 cursor-pointer ${
                  property?.isSaved ? "fill-Primary" : "bg-white"
                }`}
                onClick={() => {
                  handleSave(property?.id);
                }}
              />
            </span>

            <div className="flex items-center text-muted-foreground mb-4 pt-1">
              <MapPin className="w-4 h-4 mr-2 text-Primary" />
              <span className="flex items-center justify-center gap-1">
                {property?.city}, {property?.governate.replace("_", " ")}
              </span>
            </div>
            <div className="text-2xl font-bold text-Primary mb-4 ">
              ${property?.price.toLocaleString()}{" "}
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            {/* Beds , Baths and area */}
            <div className="grid grid-cols-4 gap-4 py-4">
              <div className="flex flex-col items-center p-3 bg-muted shadow-sm rounded-lg">
                <BedDouble className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span className="font-semibold ">{property?.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted shadow-sm rounded-lg">
                <Bath className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span className="font-semibold ">{property?.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted shadow-sm rounded-lg">
                <Maximize className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Area</span>
                <span className="font-semibold ">{property?.area}</span>
              </div>
              <div className=" flex-col items-center p-3 bg-muted shadow-sm rounded-lg flex">
                <Plug className="h-6 w-6 mb-2 text-Primary" />
                <span className="text-sm text-muted-foreground">Utilities</span>
                <span className="font-semibold ">{property?.utilities}</span>
              </div>
            </div>
            {/* <div className="flex   md:w-[60%] items-center justify-start pb-2 md:pb-4 gap-x-4 text-text font-medium   ">
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
              <h2 className="text-xl font-semibold mb-4 text-text">
                Amenities
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-3 md:gap-x-5 gap-x-3 gap-y-6   font-medium max-sm:text-sm">
                {property?.amenities?.map((am) => (
                  <div
                    className="flex items-center hover:text-Bgpurple"
                    key={am}
                  >
                    {amenityIconMap[am] || (
                      <House className="size-5 mr-2 text-Primary" /> // Default icon
                    )}
                    <p className="text-text ">{am}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6  pt-2">
            <h2 className="text-xl font-semibold  mb-3">Description</h2>
            <p className="text-[#4d5461] tracking-wide leading-relaxed md:mr-3 text-pretty">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Right column - Agent details and Map */}
        <div className="max-md:w-[90%] max-md:mx-auto md:flex gap-x-4 lg:flex-col max-md:space-y-6 lg:space-y-6 lg:sticky lg:top-6 lg:self-start items-start ">
          {/*  <Card className="cursor-pointer md:h-64 lg:h-auto md:w-auto lg:w-full mx-auto ">
            <CardContent className="p-7 ">
              <div className="flex items-center  gap-3 -ml-2 mb-4 justify-center">
                <img
                  src={property?.user?.avatar}
                  alt="Agent profile"
                  className="rounded-full size-14  ring-1 ring-bborder"
                />
                <div>
                  <h3 className="font-semibold ">
                    {property?.user?.name}
                  </h3>
                  {property?.user?.role === "AGENT" ? (
                    <p className="text-sm text-muted-foreground">
                      Real Estate Agent
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-6 ">
                {property?.user?.role === "AGENT" ? (
                  <div className="flex items-center text-sm justify-center gap-1 text-muted-foreground mb-1.5">
                    <MapPin className="w-4 h-4  text-Primary" />
                    <span>{property?.user?.company}</span>
                  </div>
                ) : null}

                <p className="mx-auto w-fit  text-xs hover:underline text-center text-blue-500">
                  View all listings
                </p>
              </div>
              <div className="  gap-x-2 flex  items-center justify-center">
                <Button
                  className=" bg-indigo-600 w-40 hover:bg-Primary"
                  onClick={() => {
                    handleMessage(property?.userId);
                  }}
                >
                  Message
                </Button>
                <Button className="w-40 bg-[#01a849] hover:bg-green-700 text-white">
                  Call
                </Button>
              </div>
            </CardContent>
          </Card> */}
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
                    <h4 className="font-semibold ">{property?.user?.name}</h4>

                    {property?.user?.role === "AGENT" ? (
                      <p className="text-sm text-muted-foreground">
                        Real Estate Agent
                      </p>
                    ) : null}

                    <div className="flex items-center mt-1">
                      {/*   {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))} */}
                      <span className="text-xs ml-1 text-indigo-400">
                        View all listings
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className=" bg-indigo-700 w-full hover:bg-Primary"
                    onClick={() => {
                      handleMessage(property?.userId);
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" /> Message Agent
                  </Button>
                  <Button
                    variant=""
                    className="w-full bg-[#01a849] hover:bg-green-700 text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Agent
                  </Button>
                </div>

                <div className="space-y-1.5  cursor-pointer hidden lg:block">
                  <div className="flex items-center hover:text-Primary">
                    <Phone className="size-4   mr-2 text-muted-foreground" />
                    <span>{property?.user?.mobile}</span>
                  </div>
                  <div className="flex items-center hover:text-Primary">
                    <Mail className="size-4   mr-2 text-muted-foreground" />
                    <span>{property?.user?.email}</span>
                  </div>
                  {property?.user?.role === "AGENT" ? (
                    <div className="flex items-center ">
                      <Building className="size-4   mr-2 text-muted-foreground" />
                      <span>{property?.user?.company}</span>
                    </div>
                  ) : null}
                </div>

                {/* Booking <div>
                  <h4 className="font-medium mb-2">Schedule a Viewing</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <Button
                        key={day}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                  <Button variant="secondary" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" /> View All Available
                    Times
                  </Button>
                </div> */}
              </CardContent>
            </Card>
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
                  image={property?.image[0]}
                  address={property?.address}
                  price={property?.price.toLocaleString()}
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
