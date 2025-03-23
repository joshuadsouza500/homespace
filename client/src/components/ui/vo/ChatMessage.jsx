import { cn } from "@/lib/utils";
import { ChevronDown, ToggleLeftIcon } from "lucide-react";
import DropDown from "../DropDown";

const ChatMessage = ({ content, timestamp, isReceived, sender }) => {
  return (
    <div
      className={cn(
        "mb-2 ",
        isReceived ? "flex justify-start" : "flex justify-end"
      )}
    >
      <div className="max-w-[75%] 2xl:max-w-[65%]">
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
          <p className="text-sm 2xl:text-base   leading-normal">{content}</p>

          <div className="flex flex-col justify-between items-end  gap-y-1 xl:gap-y-2  min-w-[20%]">
            <div className=" group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out ">
              <ChevronDown
                className={`size-4 xl:size-5  ${
                  isReceived ? "text-gray-500" : "text-gray-200"
                }`}
              />
            </div>
            <div
              className={cn(
                "text-xs mt-",
                isReceived ? "text-gray-500" : "text-gray-200"
              )}
            >
              {timestamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
