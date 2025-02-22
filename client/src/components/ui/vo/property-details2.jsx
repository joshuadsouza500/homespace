/* eslint-disable react/prop-types */
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Wifi,
  HeartIcon,
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMaker from "@/components/LocationMaker";
import PropertyGallery from "./PropertyGallery";
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

  return (
    <div className="container  mx-auto px-1 md:px-3 pt-2 md:pt-4 pb-8  ">
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
            <div className="flex   md:w-[60%] items-center justify-start pb-2 md:pb-4 gap-x-4 text-text font-medium   ">
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
            </div>
            <span className=" w-full flex justify-between items-center  py-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-text leading-snug ">
                {property?.title}
              </h1>
              <HeartIcon
                className={`hidden md:block p-2 rounded-full text-Primary size-11 hover:scale-95 cursor-pointer ${
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

            <div className="pt-2">
              {/**
              *  <div className="flex w-full items-center justify-between pb-4">
                <div className="w-[30%] font-bold flex items-center ">
                  <Bed className="size-5 mr-2 text-Primary" />
                  <span className="text-text ">{property?.bedrooms} Bed</span>
                </div>
                <div className="flex items-center w-[30%] font-bold">
                  <Bath className="size-5 mr-2 text-Primary" />
                  <span className="text-text ">
                    {property?.bathrooms} Baths
                  </span>
                </div>
                <div className="flex items-center  w-[30%] font-bold">
                  <Maximize className="size-5 mr-2 text-Primary" />
                  <span className="text-text ">{property?.area} sqft</span>
                </div>
              </div>
              */}

              <h2 className="text-xl font-semibold mb-3 text-text">
                Amenities
              </h2>
              <div className="grid grid-cols-3 lg:grid-cols-3 md:gap-x-5 gap-x-2 md:gap-y-6 gap-y-4  font-medium max-sm:text-sm">
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
            <h2 className="text-xl font-semibold text-text mb-3">
              Description
            </h2>
            <p className="text-[#4d5461] tracking-wide leading-relaxed md:mr-3 text-pretty">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Right column - Agent details and Map */}
        <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-6 lg:self-start">
          <Card className="cursor-pointer md:w-[80%] lg:w-full mx-auto">
            <CardContent className="p-5 ">
              <div className="flex items-center  gap-3 -ml-2 mb-4 justify-center ">
                <img
                  src={property?.user?.avatar}
                  alt="Agent profile"
                  className="rounded-full size-16  ring-1"
                />
                <div>
                  <h3 className="font-semibold text-text">
                    {property?.user?.name}
                  </h3>
                  {property?.user?.role === "AGENT" ? (
                    <p className="text-sm text-muted-foreground">
                      Real Estate Agent
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-6">
                {property?.user?.role === "AGENT" ? (
                  <div className="flex items-center text-sm justify-center gap-1 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4  text-Primary" />
                    <span>{property?.user?.company}</span>
                  </div>
                ) : null}

                <p className="mx-auto w-fit  text-xs hover:underline text-center text-blue-500">
                  View all listings
                </p>
              </div>
              <div className="  gap-x-2 flex  items-center justify-center">
                <Button className=" bg-blue-500 w-40">Message</Button>
                <Button
                  variant="outline"
                  className="w-40 bg-[#01a849] text-white"
                >
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="md:w-[80%] lg:w-full h-[320px] mx-auto">
            <CardContent className="p-0 h-full w-full">
              <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}
                className="bg-Bgpurple  z-0 h-[300px] w-full"
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
