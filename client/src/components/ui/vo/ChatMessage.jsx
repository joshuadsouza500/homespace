import { cn } from "@/lib/utils";
import { ChevronDown, ToggleLeftIcon } from "lucide-react";
import DropDown from "../DropDown";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

const ChatMessage = ({
  message,
  timestamp,
  isReceived,

  otherParticipant,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  return (
    <div
      className={cn(
        "mb-2  ",
        isReceived ? "flex justify-start items-end" : "flex justify-end"
      )}
    >
      {isReceived && otherParticipant ? (
        otherParticipant?.avatar ? (
          <img
            src={otherParticipant?.avatar}
            alt={otherParticipant?.name}
            className="size-8 rounded-full object-cover mr-1.5 bg-white"
          />
        ) : (
          <div className="avatar-circle size-8 mr-1.5 rounded-full flex  items-center justify-center text-white font-semibold bg-Primary ">
            {otherParticipant?.name.charAt(0).toUpperCase()}
          </div>
        )
      ) : (
        ""
      )}

      <div
        className={`max-w-[75%] 2xl:max-w-[65%] ${
          isReceived && otherParticipant ? "" : "pl-9"
        }`}
      >
        {/* isReceived && sender && (
          <div className="text-xs font-medium text-Primary mb-1 ml-1 tracking-wide">
            {sender}
          </div>
        )*/}
        <div
          className={cn(
            "rounded-lg  px-3 pt-2 pb-1 shadow-md group cursor-pointer flex justify-between",
            isReceived
              ? " bg-background1 text-gray-700 rounded-bl-none border-[0.5px] shadow-sm"
              : "bg-Primary text-white rounded-br-none"
          )}
        >
          <p className="text-sm 2xl:text-base   leading-normal capitalize-first-letter ">
            {message?.content}
          </p>

          <div className="flex flex-col justify-between items-end  gap-y-1 xl:gap-y-2  min-w-[20%] relative z-0  ">
            <DropdownMenu>
              <DropdownMenuTrigger
                className=" group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out data-[state=open]:opacity-100"
                onClick={handleDropDown}
              >
                <ChevronDown
                  className={`size-4 xl:size-5  ${
                    isReceived ? "text-gray-500" : "text-gray-200"
                  }`}
                />
              </DropdownMenuTrigger>
              <div
                className={cn(
                  "text-xs ",
                  isReceived ? "text-gray-500" : "text-gray-200"
                )}
              >
                {timestamp}
              </div>
              {dropDown && (
                <DropdownMenuContent
                  side="bottom"
                  className="w-12 mr-12 bg-white/95 "
                >
                  <DropdownMenuItem value="Copy">Copy</DropdownMenuItem>
                  <DropdownMenuSeparator className="w-[95%] mx-auto" />
                  <DropdownMenuItem value="Delete">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
