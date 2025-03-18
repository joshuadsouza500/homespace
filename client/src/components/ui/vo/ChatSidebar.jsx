import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const ChatSidebar = ({ chats, activeChat, onChatSelect }) => {
  //const [filter, setFilter] =
  // (useState < "all") | "unread" | ("important" > "all");

  ///  const filteredChats = chats.filter((chat) => {
  //    if (filter === "unread") return chat.unread;
  //   return true;
  //  });

  return (
    <div className="h-full flex flex-col border-r border-gray-200 w-full md:w-96 2xl:w-[440px] bg-white overflow-hidden animate-fade-in ">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-chat-secondary mb-5">INBOX</h1>
        {/**  <div className="mb-2">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            QUICK FILTERS
          </p>
          <div className="flex space-x-2">
            <button
              className={cn("chat-filter-button", filter === "all" && "active")}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={cn(
                "chat-filter-button",
                filter === "unread" && "active"
              )}
              onClick={() => setFilter("unread")}
            >
              Unread Chats
            </button>
          </div>
        </div> */}
      </div>

      <div className="relative mx-4 mt-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-chat-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={cn(
              "py-4 px-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all",
              activeChat === chat.id &&
                "border-l-4 border-l-Primary bg-[#F1F0FB]"
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="avatar-circle w-10 h-10 bg-Primary rounded-full flex items-center justify-center text-white font-semibold"
                    style={{
                      backgroundColor: chat.id === "a" ? "#FF5A5A" : "#7065F0",
                    }}
                  >
                    {chat.initialLetter}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{chat.time}</span>
                    {chat.unread && (
                      <span className="ml-1.5 bg-chat-red w-2 h-2 rounded-full"></span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{chat.subtitle}</p>
                <p className="text-xs text-gray-700 mt-1 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;

{
  /**
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
  }
} */
}
