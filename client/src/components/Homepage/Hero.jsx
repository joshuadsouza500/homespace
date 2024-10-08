import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropDown from "../ui/DropDown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BanknoteIcon, KeyRoundIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className=" h-dvh w-full py-10 max-w-6xl mx-auto">
      <div className="h-full   max-w-full bg-[url('/Hero2.png')] object-cover object-center rounded-3xl overflow-clip flex flex-col justify-around items-start relative ">
        <div className="absolute h-full w-full bg-black opacity-5 z-0" />
        <div className="flex flex-col items-start   w-6/12  gap-y-4  mt-10 ml-16">
          <h1 className="text-7xl text-balance font-semibold z-10 font-serif tracking-wide">
            Home Hunting{" "}
            <span className=" pt-2 flex items-center  gap-2">
              <img
                src="/oval.png"
                alt="oval house img"
                className="h-12 w-32 object-cover object-center bg-no-repeat "
              />
              Simplified.
            </span>{" "}
          </h1>

          <p className="w-8/12 ml-2  font-medium text-black/60 md:text-lg">
            We provide a complete service for the sale, purchase or rental of
            real estate.
          </p>
        </div>

        <section className="z-10 w-full">
          {" "}
          <Tabs defaultValue="Rent" className=" z-10  ml-16 ">
            <TabsList className="bg-light_gray h-12 w-52 border-b  shadow-sm ring-0 rounded-b-none ring-[#E0DEF7]">
              <TabsTrigger
                value="Rent"
                className="w-24 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold  data-[state=active]:shadow-sm shadow-Primary"
              >
                <KeyRoundIcon
                  strokeWidth={2.5}
                  className="size-4  text-Primary "
                />
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="Sell"
                className="w-24 flex items-center gap-1 text-base data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
              >
                <BanknoteIcon
                  strokeWidth={2.5}
                  className="size-5 text-Primary"
                />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-7/12 h-24 ml-16 rounded-tl-none rounded-xl bg-white/60 backdrop-blur-sm flex justify-between px-10 items-center shadow-sm ">
            <div>
              <Label htmlFor="Location">Location</Label>
              <Input
                type="email"
                id="Location"
                placeholder="Select your city"
                className="focus-visible:ring-Bgpurple"
              />
            </div>

            <div className="border-l-2 pl-4">
              <p>Property Type</p>
              <DropDown />
            </div>
            <div className="mt-3">
              <Button className="bg-Primary font-semibold">
                Find Properties
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
