import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  // " Capital_Governorate",
  // "Southern_Governorate",
  // "Muharraq_Governorate",
  // "Northern_Governorate",
];

const SearchBar = ({ setFilters, className, applyFilters }) => {
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
      setSuggestions();
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
        "relative     max-w-sm  rounded-lg   white/10 dark:bg-gray-900  py-1 ",
        className
      )}
    >
      <div className="flex items-center justify-center gap-x-1 bg-white/10   relative ">
        <Input
          type="name"
          placeholder="Select Your City"
          className=" w-full lg:border-0 h-10 lg:h-9 font-normal focus-visible:ring-[0.5px] lg:bg-white/10 px-2 capitalize"
          onChange={handleSuggestions}
          onFocus={() => {
            setIsopen(true); // Open suggestions when the input is focused
          }}
          value={InputValue}
        />

        <MapPin className="size-5 absolute right-2 lg:right-1 top-1/2  -translate-y-1/2   text-muted-foreground" />
      </div>
      <div className="w-full  absolute z-20 ">
        {isOpen &&
          suggestions.length > 0 && ( //
            <ul
              className=" border bg-white border-gray-300 md:w-[95%] xl:w-[100%] rounded-sm mt-[2px] md:mt-0.5 "
              ref={suggestionRef}
            >
              <ScrollArea className="max-h-[200px] pb-2 ">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-sm w-full px-4 font-medium py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
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
