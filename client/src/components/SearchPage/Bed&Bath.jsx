/* eslint-disable react/prop-types */
import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/UI/ShadCN/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/ShadCN/popover";
import { cn } from "@/lib/utils";

const bedroomOptions = ["1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "2", "3", "4+"];

export default function Bed_Bath({
  onSelectionChange,
  defaultBaths,
  defaultBeds,
  className,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = React.useState();
  const [selectedBathrooms, setSelectedBathrooms] = React.useState();

  const handleSelect = (type, value) => {
    if (type === "bedrooms") {
      setSelectedBedrooms(selectedBedrooms === value ? "" : value);
      onSelectionChange("bedrooms", value);
    } else {
      setSelectedBathrooms(value);
      onSelectionChange("bathrooms", value);
    }
  };

  const getButtonText = () => {
    if (selectedBedrooms && selectedBathrooms) {
      return `${selectedBedrooms} Bed, ${selectedBathrooms} Bath`;
    }
    return "Beds & Baths";
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            " justify-between hidden sm:flex md:w-44 xl:w-40  max-md:h-9",
            className
          )}
        >
          {getButtonText()}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 md:w-72 p-0">
        <div className="p-4">
          <h3 className="font-semibold mb-2">Bedrooms</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {bedroomOptions.map((option) => (
              <Button
                key={`bed-${option}`}
                variant={defaultBeds === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("bedrooms", option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <h3 className="font-semibold mb-2">Bathrooms</h3>
          <div className="flex flex-wrap gap-2">
            {bathroomOptions.map((option) => (
              <Button
                key={`bath-${option}`}
                variant={defaultBaths === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("bathrooms", option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
