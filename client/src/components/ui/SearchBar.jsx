import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";

const citiesInBahrain = [
  "A'ali",
  "Arad",
  "Budaiya",
  "Busaiteen",
  "Duraz",
  "Gudaibiya",
  "Hamad Town",
  "Isa Town",
  "Juffair",
  "Manama",
  "Malkiya",
  "Muharraq",
  "Naim",
  "Riffa",
  "Salmaniya",
  "Salmabad",
  "Sanad",
  "Sehla",
  "Sitra",
  "Tubli",
  "Zinj",
  " Capital_Governorate",
  "Southern_Governorate",
  "Muharraq_Governorate",
  "Northern_Governorate",
];

const SearchBar = ({ setFilters, className }) => {
  const [InputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const searchBarRef = useRef(null);
  const suggestionRef = useRef();

  const handleSuggestions = (e) => {
    const cityValue = e.target.value;
    setInputValue(cityValue);

    if (cityValue) {
      setIsopen(true);
      const newSuggestions = citiesInBahrain.filter((city) =>
        city.toLowerCase().includes(cityValue.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
      setIsopen(false);
      // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setIsopen(false);
    setFilters((prev) => ({ ...prev, city: suggestion }));
    setSuggestions([]); // Clear suggestions after selection
  };

  // Handle clicks outside component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) && // Check if the click was outside the search bar
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target) // Check if the click was outside the suggestion list
      ) {
        setIsopen(false);
      }
    };

    // Attach the event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef, suggestionRef]);
  return (
    <div
      ref={searchBarRef}
      className={cn(
        "relative   md:w-56   max-w-sm space-x-2 rounded-lg border border-gray-300 bg-white/90 dark:bg-gray-900 px-2 py-1",
        className
      )}
    >
      <div className="flex items-center justify-center gap-x-1 bg-white/90  focus-visible:ring-1">
        {" "}
        <Input
          type="search"
          placeholder="City or Governate"
          className="w-full border-0 h-8 font-semibold focus-visible:ring-0"
          onChange={handleSuggestions}
          value={InputValue}
        />
        <SearchIcon className="size-5 text-Primary mr-1" />
      </div>
      <div className=" lg:w-56  absolute z-20 ">
        {isOpen && suggestions.length > 0 && (
          <ul
            className=" -ml-3 border bg-white border-gray-300 md:w-[95%] xl:w-[100%] rounded-b-sm mt-1 "
            ref={suggestionRef}
          >
            <ScrollArea className="max-h-[200px] pb-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="max-lg:text-sm w-full px-4 font-medium py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </ScrollArea>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

{
  /**
    VO version



    const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const newSuggestions = citiesInBahrain.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(newSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="relative">
        <div className="flex items-center space-x-2 rounded-md border border-input bg-background">
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            id="location"
            ref={inputRef}
            type="search"
            placeholder="City or Governorate"
            className="border-0 bg-transparent"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        {isOpen && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <ScrollArea className="h-[200px]">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
    */
}
