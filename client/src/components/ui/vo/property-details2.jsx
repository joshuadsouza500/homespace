import { MapPin, Bed, Bath, Maximize, Wifi, Car } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function PropertyDetails2() {
  return (
    <div className="container mx-auto px-4 py-8  *:font-jakarta">
      {/**images */}
      <div className="w-full grid  lg:grid-cols-5 gap-5 ">
        <div className="col-span-4  md:aspect-video ">
          <img
            src="https://media.gettyimages.com/id/496649791/photo/beautiful-country-estate.jpg?s=612x612&w=gi&k=20&c=S9rzVEAVSdDfLHFTP5JC9INQ50xD4CeW9fc4ZN3V8Go="
            alt="Property main img"
            className="rounded-md object-cover object-center  w-full h-full"
          />
        </div>
        <div className="col-span-1 lg:flex flex-col  gap-3 hidden items-center">
          <div>
            <img
              src="/HomeCard3.png"
              alt="Property img 2"
              className="rounded-sm object-cover object-center aspect-square  "
            />
          </div>
          <div className="relative">
            <div className="bg-black opacity-70 h-full w-full absolute">
              <h6 className="text-white z-10 flex justify-center items-center h-full">
                View All
              </h6>
            </div>
            <img
              src="/HomeCard3.png"
              alt="Property img 2"
              className="rounded-sm object-cover object-center aspect-square  "
            />
          </div>
          <p className="p-2 bg-Primary">View more</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 pt-6 md:pt-10">
        {/* Left column - Property details */}
        <div className="flex-1 lg:pl-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 text-text">
              Star Sun Hotel & Apartment
            </h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-2 text-Primary" />
              <span>123 Main St, Anytown, USA</span>
            </div>
            <div className="text-2xl font-bold text-Primary mb-4 ">
              $1,500{" "}
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4"></div>
            <div className="">
              <h2 className="text-xl font-semibold mb-2 text-text">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-6 mb-4 font-medium">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">2 Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">2 Baths</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">1,234 sqft</span>
                </div>
                <div className="flex items-center">
                  <Wifi className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">WiFi</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">Parking Area</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-5 h-5 mr-2 text-Primary" />
                  <span className="text-text ">1,234 sqft</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text mb-2">
              Description
            </h2>
            <p className="text-[#4d5461] tracking-wide ">
              This apartment by Star Hotel is an en-suite that has a room
              connected to an apartment, which is comfortable and clean. The
              apartment features a beautiful view of surrounding hills. You can
              enjoy the sunrise, in the morning from your room.The apartment
              features a beautiful view of surrounding hills. Theres a swimming
              pool, fitness center, and access to the apartments pool and
              restaurant.
            </p>
          </div>

          <ul
            className="text-foreground/80 pt-2 list-disc font-medium tracking-wide pb-44"
            style={{ listStylePosition: "inside" }}
          >
            <li>Swimming pool access.</li>
            <li>Walk in closets.</li>
            <li>Built in Desks in some units.</li>
            <li>Private Balcony.</li>
            <li>Oversized Soaking Tubs in some units.</li>
          </ul>
        </div>

        {/* Right column - Agent details and Map */}
        <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-6 lg:self-start">
          <Card className="">
            <CardContent className="p-5 ">
              <div className="flex items-center  gap-3 -ml-2 mb-4 justify-center ">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10643/10643273.png"
                  alt="Agent profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-text">Rico Martinez</h3>
                  <p className="text-sm text-muted-foreground">
                    Real Estate Agent
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center text-sm justify-center gap-1 text-muted-foreground mb-1">
                  <MapPin className="w-4 h-4  text-Primary" />
                  <span>123 Main St, RealT Properties</span>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  12 Properties
                </p>
              </div>
              <div className="  gap-x-2 flex">
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
          <Card>
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Property location map"
                width={400}
                height={300}
                className="rounded-lg bg-gray-500 "
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
