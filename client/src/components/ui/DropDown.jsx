import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const DropDown = () => {
  return (
    <>
      <DropdownMenu
        id="propertyType"
        onValueChange={(value) => {
          handleFilterChange({ id: "pty", value });
        }}
        value={filters.pty}
      >
        <DropdownMenuTrigger className="flex h-10 w-52 rounded-md  px-3 py-2 text-black/60 text-sm  items-center gap-4">
          Choose Property type <ChevronDown className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-44">
          <DropdownMenuSeparator />
          <DropdownMenuItem value="Studio">Studio</DropdownMenuItem>
          <DropdownMenuItem value="Apartment">Apartment</DropdownMenuItem>
          <DropdownMenuItem value="Villa">Villa</DropdownMenuItem>
          <DropdownMenuItem value="Condo">Condo</DropdownMenuItem>
          <DropdownMenuItem value="Penthouse">Penthouse</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDown;
