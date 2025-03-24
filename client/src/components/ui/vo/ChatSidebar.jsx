import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const ChatSidebar = ({ chats, activeChat, onChatSelect, userId }) => {
  //const [filter, setFilter] =
  // (useState < "all") | "unread" | ("important" > "all");

  ///  const filteredChats = chats.filter((chat) => {
  //    if (filter === "unread") return chat.unread;
  //   return true;
  //  });
  // console.log("CHat sidebar", chats);
  const [isOnline, setIsOnline] = useState(false);
  return (
    <div className="h-full flex flex-col border-r border-gray-200 w-full md:w-80 2xl:w-[440px] bg-white overflow-hidden animate-fade-in f">
      <div className="p-4 border-b border-gray-100 ">
        <h1 className="text-2xl font-bold text-chat-secondary mb-2 md:mb-3">
          Chats
        </h1>
        {/** {" "}
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            Quick FILTERS
          </p>
          <div className="flex space-x-2">
            <button
              className={cn(
                "chat-filter-button rounded-full text-sm px-5 py-1.5 font-medium transition-all bg-light_gray chat-gray text-gray-700 hover:bg-gray-200" //filter === "all" && "active"
              )}
              // onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={cn(
                "chat-filter-button rounded-full text-sm px-4 py-1.5 font-medium transition-all bg-light_gray chat-gray text-gray-700 hover:bg-gray-200l"
                //  filter === "unread" && "active"
              )}
              //onClick={() => setFilter("unread")}
            >
              Unread Chats
            </button>
          </div>
        </div>*/}
      </div>

      <div className="relative mx-4 mt-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full pl-10 rounded-full pr-4 py-2.5 border border-gray-200 text-base focus:outline-none focus:ring-1 focus:ring-primary/20 text-muted-foreground  bg-secondary/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 pt-3">
        {chats.map((chat) => {
          const otherParticipant = chat.participants?.find(
            (participant) => participant.id !== userId
          );
          if (!otherParticipant) {
            return null; // If there's no other participant, skip this chat
          }
          const unreadCount = chat.unreadCounts[userId];
          const isSender = chat.messages[0]?.senderId === userId;
          const unreadLastMessage = unreadCount > 0;

          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={cn(
                "py-4 px-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all",
                activeChat === chat.id &&
                  "border-l-[3px] border-l-Primary bg-[#F1F0FB]"
              )}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {otherParticipant.avatar ? (
                    <div className="relative">
                      {" "}
                      <img
                        src={otherParticipant.avatar} // Use the avatar of the other participant
                        alt={otherParticipant.name} // Use the name of the other participant for alt attribute
                        className="size-12 xl:size-12 rounded-full object-cover ring-[0.5px] ring-Bgpurple"
                      />
                      {isOnline && (
                        <span className="bg-[#00A884]  size-[14px] rounded-full absolute z-10 -right-1 bottom-0.5 border-[0.5px]" />
                      )}
                    </div>
                  ) : (
                    <div className="avatar-circle size-12 bg-Primary rounded-full flex items-center justify-center text-white font-semibold relative">
                      {/* Show initial letter */}
                      {otherParticipant.name.charAt(0).toUpperCase()}{" "}
                      {isOnline && (
                        <span className="bg-[#00A884]  size-[14px] rounded-full absolute z-10 -right-1 bottom-0.5 border-[0.5px]" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center ">
                    <h3
                      className={`max-xl:text-sm font-semibold  text-gray-800 truncate capitalize ${
                        activeChat === chat.id && "text-gray-900 font-bold"
                      }`}
                    >
                      {otherParticipant.name}
                    </h3>
                    <div className="flex items-center ">
                      <span
                        className={`text-xs   ${
                          activeChat === chat.id && "text-gray-800"
                        } ${
                          unreadLastMessage
                            ? "text-Primary font-semibold "
                            : "text-gray-500"
                        } `}
                      >
                        {/* Format the time of the last message// Checks if the last message was sent today? if so displays the time. if not displays the day it was sent */}
                        {new Date(
                          chat.messages[0]?.createdAt
                        ).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                          ? new Date(
                              chat.messages[0]?.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : new Date(
                              chat.messages[0]?.createdAt
                            ).toLocaleDateString("en-US", { weekday: "long" })}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center justify-between text-xs text-gray-500 mt-1 truncate pl-1 ">
                    <span className="flex items-center gap-x-0.5">
                      {isSender ? "You: " : " "}
                      <p
                        className={`capitalize-first-letter line-clamp-1 ${
                          unreadLastMessage
                            ? "text-gray-700 font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {chat.lastMessage}
                      </p>
                    </span>
                    {unreadCount > 0 && (
                      <span className=" bg-Primary size-5 text-[10px]  text-white rounded-full mr-1 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;

{
  /** #00A884 : whatsapp green
    @layer components {
  .chat-tab {
    @apply relative text-base font-medium transition-all py-3 border-b-2 border-transparent text-gray-500 hover:text-chat-primary;
  }
  
  .chat-tab.active {
    @apply text-chat-primary border-chat-primary;
  }
  
  .chat-filter-button {
    @apply rounded-full text-sm px-4 py-1.5 font-medium transition-all;
  }
  
  .chat-filter-button.active {
    @apply bg-chat-primary text-white;
  }
  
  .chat-filter-button:not(.active) {
    @apply bg-chat-gray text-gray-700 hover:bg-gray-200;
  }
  
  .property-price {
    @apply text-chat-red font-semibold text-sm;
  }
  
  .avatar-circle {
    @apply rounded-full flex items-center justify-center text-white font-semibold;
  }
  
  .chat-message-bubble {
    @apply max-w-[80%] p-4 rounded-2xl;
  }
  
  .chat-message-bubble.sent {
    @apply bg-chat-light text-right ml-auto;
  }
  
  .chat-message-bubble.received {
    @apply bg-white border border-gray-200;
  }
  
  .chat-input {
    @apply w-full border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-chat-primary;
  }
  
  .conversation-item {
    @apply py-4 px-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all;
  }
  
  .conversation-item.active {
    @apply border-l-4 border-l-chat-primary bg-chat-gray;
  
} */
}
