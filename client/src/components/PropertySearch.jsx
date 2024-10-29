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
import {
  ChevronDown,
  ChevronRight,
  FilterIcon,
  Search,
  SearchIcon,
  Settings,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import Bed_Bath from "./ui/Bed&Bath";
import PropertyFilter from "./ui/vo/PropertyFilter";
import { useCallback, useEffect, useState } from "react";
import { getAllProperties } from "@/store/property/action";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SheetFilter from "./ui/vo/SheetFilter";

export default function PropertySearch() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  const [selectedBedrooms, setSelectedBedrooms] = useState();
  const [selectedBathrooms, setSelectedBathrooms] = useState();
  const [selectedFurnishing, setSelectedFurnishing] = useState();
  const [selectedUtilities, setSelectedUtilities] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    pty: searchParams.get("pty") || "",
    mnP: searchParams.get("mnP") || "",
    mxP: searchParams.get("mxP") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    frn: searchParams.get("frn") || "",
    ut: searchParams.get("ut") || "",
  });

  //, you can use a variable as the key name if you wrap it in square brackets
  const handleFilterChange = ({ id, value }) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  {
    /**
    When a function is called with a specific set of arguments, the result is stored in a cache (usually a plain object or a Map). The function checks the cache before performing any computations.
    //
     The primary purpose of useCallback is to optimize the performance of your components by preventing unnecessary re-creations of functions, which can lead to unnecessary re-renders of child components that depend on those functions as props.
    */
  }
  const onSelectionChange = useCallback(
    (type, value) => {
      let newBeds, newBaths, newFurnishing, newUtilities;

      setFilters((prev) => {
        const newFilters = { ...prev }; // Copy existing filters

        switch (type) {
          case "bedrooms":
            // If the same value is clicked again, it should be deselected.
            newBeds = selectedBedrooms === value ? "" : value;
            setSelectedBedrooms(newBeds); // Update the state
            newFilters.beds = newBeds; // Update filter directly
            break;

          case "bathrooms":
            newBaths = selectedBathrooms === value ? "" : value;
            setSelectedBathrooms(newBaths);
            newFilters.baths = newBaths;
            break;

          case "furnishing":
            newFurnishing = selectedFurnishing === value ? "" : value;
            setSelectedFurnishing(newFurnishing);
            newFilters.frn = newFurnishing;
            break;

          case "utilities":
            newUtilities = selectedUtilities === value ? "" : value;
            setSelectedUtilities(newUtilities);
            newFilters.ut = newUtilities;
            break;

          default:
            console.warn("Unknown type selected:", type);
            break;
        }

        return newFilters; // Return the updated filters
      });
    },
    [selectedBedrooms, selectedBathrooms, selectedFurnishing, selectedUtilities]
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    // converts it into an array of key-value pairs.
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const updatedUrlParams = params.toString();
    setSearchParams(params);
    dispatch(getAllProperties(updatedUrlParams));
  };

  const clearFilters = () => {
    setSearchParams({});
    setFilters({});
    dispatch(getAllProperties());
  };

  return (
    <div className="w-full   border-t ">
      <div className="flex flex-col max-lg:gap-y-1 items-center py-2  lg:py-4  mx-auto border-b  lg:px-6  grid-cols-3 ">
        <section className="w-full lg:w-[95%] lg:pl-4  flex  justify-start  mx-auto   py-1 md:py-2 gap-x-1   ">
          <div className="relative w-[65%] lg:w-[75%] ">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8 "
              placeholder="City, community or building"
            />
          </div>
          <Button
            className="bg-Bgpurple max-md:w-[20%] md:w-[15%]  text-white  lg:hidden"
            onClick={applyFilters}
          >
            Find
          </Button>
          <div className="filter-component">
            {/* SheetFilter Component */}
            <SheetFilter
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleInputChange={handleInputChange}
              onSelectionChange={onSelectionChange}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
            />

            {/* Trigger Button (Optional) */}
          </div>
        </section>

        <div className="  flex gap-x-1 w-full  lg:col-span-2 py-2  max-sm:overflow-x-scroll">
          {/*Rent & Sell*/}
          <Select
            id="type"
            name="type"
            value={filters.type}
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <SelectTrigger className="w-24 max-md:h-9 md:w-[100px]">
              <SelectValue placeholder="Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
            </SelectContent>
          </Select>
          {/*Property Type*/}
          <Select
            id="propertyType"
            onValueChange={(value) => {
              handleFilterChange({ id: "pty", value });
            }}
            value={filters.pty}
            className="bg-red-200"
          >
            <SelectTrigger className="md:w-[200px] w-32  max-md:h-9  ">
              <SelectValue placeholder="Property type" />
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
          {/*Beds & Baths*/}
          <Bed_Bath
            onSelectionChange={onSelectionChange}
            defaultBeds={filters.beds}
            defaultBaths={filters.baths}
          />
          {/*Price */}
          <Popover className=" md:w-40">
            <PopoverTrigger asChild>
              <Button
                className="max-md:h-9 w-24 md:w-36 justify-between"
                variant="outline"
              >
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
                    <Label htmlFor="mnP">Min. Price</Label>
                    <Input
                      id="mnP"
                      type="number"
                      name="mnP"
                      value={`${filters.mnP || "800"}`}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="mxP">Max. Price</Label>
                    <Input
                      id="mxP"
                      type="number"
                      name="mxP"
                      value={`${searchParams.mxP || "200000"}`}
                      className="col-span-2 h-8"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/*More FIlters*/}
          <PropertyFilter
            onSelectionChange={onSelectionChange}
            defaultFrn={filters.frn}
            defaultUt={filters.ut}
          />
          <Button
            className="bg-Bgpurple  w-32 hover:bg-text text-white hidden lg:block ml-1 "
            onClick={applyFilters}
          >
            Find
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-end  max-w-6xl mx-auto max-md:mx-2 pb-4 md:pb-6 sm:pt-1">
        <div>
          <p className="flex items-center text-xs font-light">
            Home
            <ChevronRight className="size-4" />
            properties for sale
          </p>
          <h1 className="text-lg md:text-2xl font-bold pt-2 md:pt-4">
            Properties for sale in Bahrain
          </h1>
        </div>
        <Select>
          <SelectTrigger className="w-24  md:w-32 text-xs max-sm:h-9 ">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent className="w-28 md:w-36">
            <SelectGroup>
              <SelectLabel value="featured" className="pl-6">
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
