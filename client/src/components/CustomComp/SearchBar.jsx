import { MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../UI/ShadCN/input";
import { ScrollArea } from "../UI/ShadCN/scroll-area";
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

const SearchBar = ({ setFilters, className, isHero, city }) => {
  const [InputValue, setInputValue] = useState(city || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted suggestion
  const searchBarRef = useRef(null);
  const suggestionRef = useRef();

  const handleSuggestions = (e) => {
    const cityValue = e.target.value;
    setInputValue(cityValue);

    if (cityValue) {
      setIsopen(true);
      const newSuggestions = citiesInBahrain.filter((city) =>
        city?.toLowerCase().includes(cityValue.toLowerCase())
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

  const handleKeyDown = (e) => {
    if (isOpen && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setHighlightedIndex(
          (prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0 //Checks if current tab isnt last
        );
      } else if (e.key === "ArrowUp") {
        // Move up in the suggestions list
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        // Select the highlighted suggestion
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else if (e.key === "Escape") {
        // Close the suggestions list
        setIsopen(false);
      }
    }
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

  const clearSearch = () => {
    setInputValue("");
    setFilters((prev) => ({ ...prev, city: "" }));
  };

  return (
    <div
      ref={searchBarRef}
      className={cn("relative   rounded-lg   ", className)}
    >
      <div className="flex items-center justify-center gap-x-1 relative ">
        <Input
          type="text"
          data-testid="search-bar"
          placeholder="Select Your City"
          onKeyDown={handleKeyDown}
          className={`w-full  h-10  font-normal focus-visible:ring-[0.5px] dark:placeholder:text-[#f8fdff]  px-2 capitalize dark:bg-[#222222] dark:border-[#49494b] [#4D4D4E]  ${
            isHero ? "h-10 lg:bg-gray-100 lg:h-9 lg:border-0 " : ""
          }`}
          onChange={handleSuggestions}
          onFocus={() => {
            setIsopen(true); // Open suggestions when the input is focused
          }}
          value={InputValue}
        />

        {InputValue ? (
          <X
            className={`size-5 absolute right-2  top-1/2  -translate-y-1/2   text-muted-foreground cursor-pointer hover:text-red-600`}
            onClick={clearSearch}
          />
        ) : (
          <MapPin className="size-5 absolute right-2  top-1/2  -translate-y-1/2   text-muted-foreground" />
        )}
      </div>
      <div className="w-full  absolute z-20 ">
        {isOpen &&
          suggestions?.length > 0 && ( //
            <ul
              className=" border bg-white border-gray-300 md:w-[95%] xl:w-[100%] rounded-sm mt-[2px] md:mt-0.5 dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]"
              ref={suggestionRef}
            >
              <ScrollArea className="max-h-[200px] pb-2 ">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    className={`text-sm w-full px-4 font-medium py-2 text-left hover:bg-gray-100 dark:hover:bg-[#222222] focus:bg-gray-100 focus:outline-none dark:text-[#F8FDFF] ${
                      highlightedIndex === index
                        ? "bg-gray-100 dark:bg-[#222222] "
                        : " "
                    }`}
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
