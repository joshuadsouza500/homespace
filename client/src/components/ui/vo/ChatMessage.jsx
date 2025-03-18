import { cn } from "@/lib/utils";

const ChatMessage = ({ content, timestamp, isReceived, sender }) => {
  return (
    <div
      className={cn(
        "mb-4",
        isReceived ? "flex justify-start" : "flex justify-end"
      )}
    >
      <div className="max-w-[75%]">
        {isReceived && sender && (
          <div className="text-xs font-medium text-Primary mb-1 ml-1 tracking-wide">
            {sender}
          </div>
        )}
        <div
          className={cn(
            "rounded-lg px-3 pt-3 pb-2 shadow-md",
            isReceived ? "bg-gray-50 text-gray-800" : "bg-Primary text-white"
          )}
        >
          <p className="text-sm">{content}</p>
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
