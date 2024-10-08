import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { ChevronDown, ChevronRight, SearchIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import Bed_Bath from "./ui/Bed&Bath";
import PropertyFilter from "./ui/vo/PropertyFilter";

export default function PropertySearch() {
  return (
    <div className="w-full   space-y-4 border-t ">
      <div className="flex flex-col max-lg:gap-y-4 lg:flex-row items-center space-x-2  py-4 max-w-6xl mx-auto border-b max-md:mx-2">
        <section className="w-full flex justify-around">
          <div className="relative w-64">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="City, community or building" />
          </div>
          <Button className="bg-Bgpurple w-20 text-white  lg:hidden">
            Find
          </Button>
        </section>

        <div className=" flex gap-x-1 w-full overflow-scroll">
          {/*Rent & Sell*/}
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          {/*Property Type*/}
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel className="pl-4">Property Type</SelectLabel>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="apartments">Apartment</SelectItem>
                <SelectItem value="villas">Villa</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/*Beds & Baths*/}
          <Bed_Bath />
          {/*Price */}
          <Popover className="w-40">
            <PopoverTrigger asChild>
              <Button className="w-36 justify-between" variant="outline">
                Price
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Set min price and max price
                </p>

                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="minPrice">Min. Price</Label>
                    <Input
                      id="minPrice"
                      defaultValue="$800"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxPrice">Max. Price</Label>
                    <Input
                      id="maxPrice"
                      defaultValue="$20,300"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/*More FIlters*/}
          <PropertyFilter />
          <Button className="bg-Bgpurple w-20 text-white hidden lg:block">
            Find
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-end  max-w-6xl mx-auto max-md:mx-2 pb-6">
        <div>
          <p className="flex items-center text-xs font-light">
            Home
            <ChevronRight className="size-4" />
            properties for sale
          </p>
          <h1 className="text-xl md:text-2xl font-bold pt-4">
            Properties for sale in Bahrain
          </h1>
        </div>
        <Select>
          <SelectTrigger className="w-32 ">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent className="w-36">
            <SelectGroup>
              <SelectLabel value="featured" className="pl-7">
                Featured
              </SelectLabel>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
