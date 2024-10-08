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
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 w-52 rounded-md  px-3 py-2 text-black/60 text-sm  items-center gap-4">
          Choose Property type <ChevronDown className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-44">
          <DropdownMenuSeparator />
          <DropdownMenuItem>Condo</DropdownMenuItem>
          <DropdownMenuItem>Villa</DropdownMenuItem>
          <DropdownMenuItem>Bunglow</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDown;
