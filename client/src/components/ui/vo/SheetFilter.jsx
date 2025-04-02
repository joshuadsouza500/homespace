import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../input"; // Assuming you have an Input component
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // ShadCN Tabs

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

const SheetFilter = ({
  isFilterOpen,
  setIsFilterOpen,
  filters,
  handleFilterChange,
  handleInputChange,
  applyFilters,
  onSelectionChange,
  clearFilters,
}) => {
  const furnishingOptions = ["Furnished", "Semifurnished", "Unfurnished"];
  const utilitiesOptions = ["Inclusive", "Exclusive"];
  const bedroomOptions = ["Studio", "1", "2", "3", "4", "5+"];
  const bathroomOptions = ["1", "2", "3", "4+"];
  const handleSelect = (type, value) => {
    onSelectionChange(type, value);
  };
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap  ">
          <SlidersHorizontal className="size-4 text-text" />
          {/** <span className="max-md:hidden ml-2">Filters</span> */}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-lg  h-screen overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Filters</SheetTitle>
          <SheetDescription className="hidden">
            Adjust your search parameters
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Rent / Sell Tabs */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-semibold">
              Type
            </Label>
            <Tabs
              value={filters.type || "rent"}
              onValueChange={(value) =>
                handleFilterChange({ id: "type", value })
              }
            >
              <TabsList className="flex gap-x-2 mx-1  h-11 px-2 ">
                <TabsTrigger
                  className=" w-full data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold "
                  value="Rent"
                >
                  Rent
                </TabsTrigger>
                <TabsTrigger
                  className=" w-full data-[state=active]:text-Primary data-[state=active]:border border-bborder font-bold"
                  value="Sell"
                >
                  Sell
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Property Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-base font-semibold">
              Property Type
            </Label>
            <Select
              onValueChange={(value) =>
                handleFilterChange({ id: "pty", value })
              }
              value={filters.pty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="pl-4">Property Type</SelectLabel>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Condo">Condo</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Price Range</Label>
            <div className="grid grid-cols-2 gap-2 mx-1">
              <div className="">
                <Input
                  id="mnP"
                  type="number"
                  name="mnP"
                  placeholder="Min Price"
                  value={filters.mnP || ""}
                  onChange={handleInputChange}
                  className="max-md:h-8"
                />
              </div>
              <div className="">
                <Input
                  id="mxP"
                  type="number"
                  name="mxP"
                  placeholder="Max Price"
                  value={filters.mxP || ""}
                  onChange={handleInputChange}
                  className=" max-md:h-8"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms Filter */}
          {/* Bedrooms Filter */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((option) => (
                <Button
                  key={`bed-${option}`}
                  variant={filters.beds === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelect("bedrooms", option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Bathrooms Filter */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Bathrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bathroomOptions.map((option) => (
                <Button
                  key={`bath-${option}`}
                  variant={filters.baths === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelect("bathrooms", option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Furnishing and Utilities Filter */}
          {/* Furnishing Filter */}
          <div className="space-y-2">
            <h3 className="font-semibold">Furnishing</h3>
            <div className="flex flex-wrap gap-2">
              {furnishingOptions.map((option) => (
                <Button
                  key={`furnishing-${option}`}
                  variant={filters["frn"] === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelect("furnishing", option)}
                  className="h-8"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Utilities Filter */}
          <div className="space-y-2">
            <h3 className="font-semibold">Utilities</h3>
            <div className="flex flex-wrap gap-2">
              {utilitiesOptions.map((option) => (
                <Button
                  key={`utilities-${option}`}
                  variant={filters["ut"] === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelect("utilities", option)}
                  className="h-8"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <SheetClose asChild>
            <div className="flex flex-col gap-y-2">
              <Button
                className="w-full bg-Bgpurple hover-text"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
              <Button
                onClick={clearFilters}
                className="w-full border border-Bgpurple bg-white text-black"
              >
                Clear Filters
              </Button>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetFilter;
