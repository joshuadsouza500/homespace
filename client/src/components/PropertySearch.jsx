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
import { useCallback, useEffect, useState } from "react";
import { getAllProperties } from "@/store/property/action";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

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

  return (
    <div className="w-full   space-y-4 border-t ">
      <div className="flex flex-col max-lg:gap-y-4 lg:flex-row items-center space-x-2  py-4 max-w-6xl mx-auto border-b max-md:mx-2 lg:grid grid-cols-3">
        <section className="w-full flex  lg:justify-start lg:pl-2  lg:col-span-1 py-2 justify-around">
          <div className="relative w-[75%] lg:w-[90%] overflow-hidden">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="City, community or building" />
          </div>
          <Button
            className="bg-Bgpurple w-20 text-white  lg:hidden"
            onClick={applyFilters}
          >
            Find
          </Button>
        </section>

        <div className="  flex gap-x-1 w-full  lg:col-span-2 py-2 px-1">
          {/*Rent & Sell*/}
          <Select
            id="type"
            name="type"
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <SelectTrigger className="w-[100px]">
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
          >
            <SelectTrigger className="w-[150px]">
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
          <Bed_Bath onSelectionChange={onSelectionChange} />
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
                    <Label htmlFor="mnP">Min. Price</Label>
                    <Input
                      id="mnP"
                      type="number"
                      name="mnP"
                      defaultValue={`${filters.mnP || "800"}`}
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
                      defaultValue={`${filters.mxP || "200,000"}`}
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
          <PropertyFilter onSelectionChange={onSelectionChange} />
          <Button
            className="bg-Bgpurple w-20 text-white hidden lg:block"
            onClick={applyFilters}
          >
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
