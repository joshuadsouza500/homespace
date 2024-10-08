import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const bedroomOptions = ["1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "2", "3", "4+"];

export default function Bed_Bath() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = React.useState();
  const [selectedBathrooms, setSelectedBathrooms] = React.useState();

  const handleSelect = (type, value) => {
    if (type === "bedroom") {
      setSelectedBedrooms(value);
    } else {
      setSelectedBathrooms(value);
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
        <Button variant="outline" className="w-[200px] justify-between">
          {getButtonText()}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-4">
          <h3 className="font-semibold mb-2">Bedrooms</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {bedroomOptions.map((option) => (
              <Button
                key={`bed-${option}`}
                variant={selectedBedrooms === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("bedroom", option)}
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
                variant={selectedBathrooms === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("bathroom", option)}
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
