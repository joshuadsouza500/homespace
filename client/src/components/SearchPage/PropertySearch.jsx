import { Button } from "@/components/UI/ShadCN/button";
import { Input } from "@/components/UI/ShadCN/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/UI/ShadCN/select";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/ShadCN/popover";
import { Label } from "../UI/ShadCN/label";
import Bed_Bath from "./Bed&Bath";
import PropertyFilter from "../UI/PropertyFilter";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { getAllProperties } from "@/store/property/action";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../CustomComp/SearchBar";
import SheetFilter from "./SheetFilter";

//Allows the parent component to pass a ref to child and then be used.
const PropertySearch = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  /*   useEffect(() => {
    dispatch(getAllProperties("pg=1"));
  }, [dispatch]); */
  const [selectedBedrooms, setSelectedBedrooms] = useState();
  const [selectedBathrooms, setSelectedBathrooms] = useState();
  const [selectedFurnishing, setSelectedFurnishing] = useState();
  const [selectedUtilities, setSelectedUtilities] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    pty: searchParams.get("pty") || "",
    city: searchParams.get("city") || "",
    mnP: searchParams.get("mnP") || "",
    mxP: searchParams.get("mxP") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    frn: searchParams.get("frn") || "",
    ut: searchParams.get("ut") || "",
    srt: searchParams.get("srt") || "",
    pg: searchParams.get("pg") || 1,
  });

  //, you can use a variable as the key name if you wrap it in square brackets
  const handleFilterChange = ({ id, value }) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /*   const handlePageChange = (value) => {
    //get the string which is the page number from the url and parseInt converts it to int and,10 is to make the number base 10 and then we set it to num-1 or +1
    //Here set some variable state to true. And then in aplyfilters when it is called if this var is true it doesnt reset the page
    if (value === "prev") {
      const prevPage = parseInt(filters.pg, 10) || 1;
      if (prevPage <= 1) return; // Prevents from going negative
      setFilters((prev) => ({ ...prev, ["pg"]: prevPage - 1 }));
      applyFilters(false);
    } else if (value === "next") {
      const nextPage = parseInt(filters.pg, 10);

      //Check the total number of pages to make sure it doesnt exceed it
      if (nextPage >= props?.totalPages) return;
      setFilters((prev) => ({ ...prev, ["pg"]: nextPage + 1 }));
      console.log("ext", filters.pg);
      applyFilters(false);
    } else {
      setFilters((prev) => ({ ...prev, ["pg"]: value }));
      applyFilters(false);
    }
  }; */

  const handlePageChange = (value) => {
    setFilters((prev) => {
      let newPage;
      const currentPage = parseInt(prev.pg, 10) || 1;

      if (value === "prev") {
        newPage = currentPage > 1 ? currentPage - 1 : 1;
      } else if (value === "next") {
        if (currentPage >= props?.totalPages) return prev;
        newPage = currentPage + 1;
      } else {
        newPage = value;
      }

      const updated = { ...prev, pg: newPage };
      const params = new URLSearchParams();

      Object.entries(updated).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      setSearchParams(params);
      dispatch(getAllProperties(params.toString()));
      return updated; //updates filter state
    });
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

  const applyFilters = (resetPage = false) => {
    const params = new URLSearchParams();
    const page = resetPage ? 1 : filters.pg;
    // Reset the page number to 1 since a filter is being applied
    const updatedFilters = {
      ...filters,
      pg: page,
    };
    // converts it into an array of key-value pairs.
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    const updatedUrlParams = params.toString();

    setSearchParams(params);
    setFilters(updatedFilters); //Update searchParams and filter to reflect new page change
    dispatch(getAllProperties(updatedUrlParams));
  };

  const clearFilters = () => {
    setSearchParams(() => {
      const newParams = new URLSearchParams();
      newParams.set("pg", 1); //Retain the current page
      return newParams;
    });
    setFilters(() => ({
      pg: 1, // Retain the current page
    }));

    dispatch(getAllProperties(`pg=1`));
  };
  useEffect(() => {
    applyFilters(true);
  }, [filters.srt, filters.type]);

  useEffect(() => {
    if (filters) {
      applyFilters();
    }
  }, []); //Runs on mount by checking if Search params exist

  // Expose functions to the parent via ref
  useImperativeHandle(ref, () => ({
    handlePageChange,
    currentPage: filters?.pg,
  }));

  /* #222222 */
  return (
    <div className="w-full  " ref={ref}>
      {/**Xl screens+ */}
      <div className="hidden xl:flex flex-col  items-center py-3  mx-auto border-b dark:border-[#49494b] [#4D4D4E]  px-1 ">
        <section className="w-full  flex  justify-start px-2  mx-auto  py-2 gap-x-2  ">
          <div className="relative w-[30%]  ">
            <SearchBar
              city={filters?.city}
              setFilters={setFilters}
              isHero={false}
              className={"md:w-full max-w-full   focus-visible:border-0 "}
            />
          </div>
          <Select
            id="type"
            name="type"
            value={filters.type}
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <SelectTrigger className="w-24 max-md:h-9 xl:w-36">
              <SelectValue placeholder="Rent" />
            </SelectTrigger>
            <SelectContent className="xl:min-w-[7rem]">
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
          >
            <SelectTrigger className=" w-32 md:w-48 xl:w-40  max-md:h-9  ">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>

            <SelectContent className="pb-2 ">
              <SelectGroup>
                <SelectLabel className="pl-6 ">Property Type</SelectLabel>
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
          <Popover className=" md:w-40 xl:w-32 ">
            <PopoverTrigger asChild>
              <Button
                className="max-md:h-9 w-24 md:w-32  justify-between  "
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
                      className="col-span-2 h-8 "
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
          <Button
            className="bg-indigo-700  max-md:w-28 md:w-32   text-white  transition-colors duration-300 ease-in-out hover:bg-indigo-600"
            data-testid="find-properties-button"
            onClick={() => {
              applyFilters(true);
            }}
          >
            Find
          </Button>

          <div className="filter-component md:hidden ">
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
          <Button
            className="bg-red-500 w-24   text-white  transition-colors duration-500 ease-in-out hover:bg-red-700"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </section>
      </div>
      {/**xs-lg screens */}
      <div className=" xl:hidden flex flex-col max-lg:gap-y-1 items-center py-2  lg:py-4  mx-auto border-b dark:border-[#4D4D4E]  lg:px-2  grid-cols-3 ">
        <section className="w-full  flex  justify-start  mx-auto   pt-1 md:py-2 gap-x-2  ">
          <div className="relative w-[65%] md:w-[75%]  ">
            <SearchBar
              setFilters={setFilters}
              city={filters?.city}
              isHero={false}
              className={"md:w-full max-w-full"}
            />
          </div>
          <Button
            className="bg-indigo-700 hover:bg-indigo-600 max-md:w-[20%] md:w-32  text-white  "
            onClick={() => {
              applyFilters(true);
            }}
          >
            Find
          </Button>
          <div className="filter-component">
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
          </div>
        </section>

        <div className=" flex gap-x-2 w-full  lg:col-span-2 py-2  max-sm:overflow-x-scroll searchScroll">
          <Select
            id="type"
            name="type"
            value={filters.type}
            onValueChange={(value) => {
              handleFilterChange({ id: "type", value });
            }}
          >
            <SelectTrigger className="w-28 max-md:h-9 md:w-[100px]">
              <SelectValue placeholder="Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          <Select
            id="propertyType"
            onValueChange={(value) => {
              handleFilterChange({ id: "pty", value });
            }}
            value={filters.pty}
          >
            <SelectTrigger className="md:w-40 [200px] w-36  max-md:h-9  ">
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

          <Bed_Bath
            onSelectionChange={onSelectionChange}
            defaultBeds={filters.beds}
            defaultBaths={filters.baths}
          />

          <Popover className=" md:w-40">
            <PopoverTrigger asChild>
              <Button
                className="max-md:h-9 w-28 md:w-36 justify-between"
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

          <PropertyFilter
            onSelectionChange={onSelectionChange}
            defaultFrn={filters.frn}
            defaultUt={filters.ut}
          />
          <Button
            className="bg-red-500 w-24   text-white  transition-colors duration-500 ease-in-out hover:bg-red-700  max-md:h-9"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </div>

      {/****Property for sale  */}
      <div className="flex  justify-between items-end  max-w-6xl xl:max-w-7xl mx-auto max-md:mx-2 md:px-2 pb-4 md:pb-5 2xl:pb-8  pt-2 ">
        <div className="md:pt-0.5 dark:text-[#F8FDFF]">
          <p className="flex items-center text-xs font-light ">
            Home
            <ChevronRight className="size-4" />
            Properties for sale
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold pt-2 md:pt-4">
            Properties for sale in Bahrain
          </h2>
        </div>
        <Select
          onValueChange={(value) => {
            handleFilterChange({ id: "srt", value });
          }}
          value={filters.srt}
        >
          <SelectTrigger className="w-24  md:w-32 text-xs max-sm:h-9 ">
            <SelectValue placeholder="Sort" className="text-semibold" />
          </SelectTrigger>
          <SelectContent className="w-28 md:w-36 ">
            <SelectGroup>
              <SelectLabel value="featured" className="pl-6 ">
                Featured
              </SelectLabel>
              <SelectItem value="new">Newest</SelectItem>
              <SelectItem value="low">Price: Low to High</SelectItem>
              <SelectItem value="high">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});
// Set display name for easier debugging
PropertySearch.displayName = "PropertySearch";
export default PropertySearch;
