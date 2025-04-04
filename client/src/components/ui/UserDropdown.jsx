/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const UserDropdown = ({ handleLogout, user }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" flex size-11 rounded-full    text-white font-bold justify-center  items-center ring-2 ">
        {user?.avatar ? (
          <img
            className="h-full w-full object-cover rounded-full"
            src={user?.avatar}
          />
        ) : (
          <h1>{user?.name[0].toUpperCase()}</h1>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-40 mr-1 text-text font-medium font-jakarta"
      >
        <DropdownMenuItem
          className="text-base "
          onClick={() => navigate("/user")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-base "
          onClick={() => navigate("/user/chat")}
        >
          Chats
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-base "
          onClick={() => navigate("/user/property")}
        >
          My Properties
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-base "
          onClick={() => navigate("/user/saved")}
        >
          Saved Properties
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base ">
          <button onClick={handleLogout}>Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
