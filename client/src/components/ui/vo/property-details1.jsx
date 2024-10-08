import { MapPin, Bed, Bath, Maximize, Wifi, Car } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PropertyDetails1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Property details */}
        <div className="flex-1">
          <div className="relative aspect-[16/9] bg-red-400">
            <img
              src="/Hero.png"
              alt="Property main img"
              className="rounded-lg object-cover object-center"
            />
            <Button variant="secondary" className="absolute top-4 left-4">
              Virtual Tour
            </Button>
          </div>
          <div className="hidden grid grid-cols-2 gap-2 mb-6 bg-green-500">
            <img
              src="/HomeCard.png"
              alt="Property img 1"
              width={300}
              height={250}
              className="rounded-lg object-cover  object-center"
            />
            <img
              src="/HomeCard2.png"
              alt="Property img 2"
              width={300}
              height={250}
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Star Sun Hotel & Apartment
            </h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>123 Main St, Anytown, USA</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-4">
              $1,500 /month
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2" />
                <span>2 Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2" />
                <span>2 Baths</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-5 h-5 mr-2" />
                <span>1,234 sqft</span>
              </div>
              <div className="flex items-center">
                <Wifi className="w-5 h-5 mr-2" />
                <span>WiFi</span>
              </div>
              <div className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                <span>Parking Area</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">
              This apartment by Star Hotel is an en-suite that has a room
              connected to an apartment, which is comfortable and clean. The
              apartment features a beautiful view of surrounding hills. You can
              enjoy the sunrise in the morning from your room. Theres a swimming
              pool, fitness center, and access to the apartments pool and
              restaurant.
            </p>
          </div>
        </div>

        {/* Right column - Agent details and Map */}
        <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-6 lg:self-start">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/HomeCard.png"
                  alt="Agent profile"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Olivia Martinez</h3>
                  <p className="text-sm text-muted-foreground">
                    Real Estate Agent
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Button className="w-full">Message</Button>
                <Button variant="outline" className="w-full">
                  Call
                </Button>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                12 Properties
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <img
                src="data:image/jpeg;base64,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"
                alt="Property location map"
                width={400}
                height={250}
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
