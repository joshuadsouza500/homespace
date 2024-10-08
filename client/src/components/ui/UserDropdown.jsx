import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-11 rounded-full bg-Primary   text-white font-bold justify-center  items-center ring-2 ">
        J
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-40 pb-4">
        <DropdownMenuItem className="text-base ">Profile</DropdownMenuItem>
        <DropdownMenuItem className="text-base ">
          My Properties
        </DropdownMenuItem>

        <DropdownMenuItem className="text-base ">
          Saved Properties
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base ">Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
