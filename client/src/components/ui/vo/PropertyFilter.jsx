import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PropertyFilter({
  onSelectionChange,
  defaultFrn,
  defaultUt,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFurnishing, setSelectedFurnishing] = useState("");
  const [selectedUtilities, setSelectedUtilities] = useState("");

  const furnishingOptions = ["Furnished", "Semifurnished", "Unfurnished"];
  const utilitiesOptions = ["Inclusive", "Exclusive"];

  const handleSelect = (type, value) => {
    if (type === "furnishing") {
      setSelectedFurnishing(selectedFurnishing === value ? "" : value);
      onSelectionChange("furnishing", value);
    } else {
      setSelectedUtilities(selectedUtilities === value ? "" : value);
      onSelectionChange("utilities", value);
    }
  };

  const getButtonText = () => {
    const selections = [];
    if (selectedFurnishing) selections.push(selectedFurnishing);
    if (selectedUtilities) selections.push(selectedUtilities);
    return selections.length > 0 ? selections.join(", ") : "More Filters";
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="max-md:h-9 w-32 md:w-[200px] justify-between"
        >
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
          <h3 className="font-semibold mb-2">Furnishing</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {furnishingOptions.map((option) => (
              <Button
                key={`furnishing-${option}`}
                variant={defaultFrn === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("furnishing", option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <h3 className="font-semibold mb-2">Utilities</h3>
          <div className="flex flex-wrap gap-2">
            {utilitiesOptions.map((option) => (
              <Button
                key={`utilities-${option}`}
                variant={defaultUt === option ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelect("utilities", option)}
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
