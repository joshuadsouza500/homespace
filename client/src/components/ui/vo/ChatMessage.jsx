import { cn } from "@/lib/utils";
import { ChevronDown, ToggleLeftIcon } from "lucide-react";
import DropDown from "../DropDown";

const ChatMessage = ({ content, timestamp, isReceived, sender }) => {
  return (
    <div
      className={cn(
        "mb-4",
        isReceived ? "flex justify-start" : "flex justify-end"
      )}
    >
      <div className="max-w-[75%] 2xl:max-w-[65%]">
        {isReceived && sender && (
          <div className="text-xs font-medium text-Primary mb-1 ml-1 tracking-wide">
            {sender}
          </div>
        )}
        <div
          className={cn(
            "rounded-lg  px-3 pt-3 pb-2 shadow-md group cursor-pointer",
            isReceived
              ? "bg-gray-50 text-gray-800 rounded-bl-none"
              : "bg-Primary text-white rounded-br-none"
          )}
        >
          <div className="flex justify-between items-start gap-x-3 pb-1">
            <p className="text-sm   leading-normal">{content}</p>
            <div className=" group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out ">
              <ChevronDown className="size-4 xl:size-5" />
            </div>
          </div>
          <div
            className={cn(
              "text-xs mt-1 ",
              isReceived ? "text-gray-500" : "text-gray-200"
            )}
          >
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
