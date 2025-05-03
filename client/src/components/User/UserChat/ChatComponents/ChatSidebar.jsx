/* eslint-disable react/prop-types */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const ChatSidebar = ({ chats, activeChat, onChatSelect, userId }) => {
  const [isOnline, setIsOnline] = useState(false);
  return (
    <div className="h-full flex flex-col  w-full md:w-80 2xl:w-[440px] bg-estate-50 dark:bg-[#121212] overflow-hidden animate-fade-in ">
      <div className="pt-4 px-4  ">
        <h1 className="text-3xl md:text-4xl max-md:text-center font-bold text-chat-secondary mb-3 md:mb-3 dark:text-[#F8FDFF]">
          Chats
        </h1>
      </div>
      <section className="bg-white h-full  rounded-lg shadow-md backdrop-blur-md mx-2 my-2 border-gray-100 border-[0.5px] dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]">
        <div className="relative px-4 pt-4 ">
          <div className="absolute inset-y-1 top-5 left-7 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 rounded-full pr-4 py-2.5 border border-gray-200 text-base focus:outline-none focus:ring-1 focus:ring-primary/20 text-muted-foreground  bg-secondary/50 dark:bg-[#222222] dark:border-[#49494b] [#4D4D4E]"
          />
        </div>

        <div className="flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 pt-3 ">
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
                  "py-4 px-3 border-b border-gray-100 hover:bg-gray-50 dark:border-[#49494b] dark:hover:bg-[#222222] cursor-pointer transition-all ",
                  activeChat === chat.id &&
                    "border-l-[3px] border-l-Primary bg-[#F1F0FB] dark:bg-[#222222]"
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
                        className={`max-xl:text-sm font-semibold  text-gray-800 truncate capitalize dark:text-[#F8FDFF] ${
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
                              : "text-gray-500 dark:text-muted-foreground"
                          } `}
                        >
                          {/* Format the time of the last message// Checks if the last message was sent today? if so displays the time. if not displays the day it was sent */}
                          {chat.messages.length > 0 ? (
                            (() => {
                              const messageDate = new Date(
                                chat.messages[0]?.createdAt
                              );
                              const today = new Date();
                              const startOfWeek = new Date(today);
                              startOfWeek.setDate(
                                today.getDate() - today.getDay()
                              ); // getDay return number for each day of the week Sunday 0 , 1 etc this basically gets what date 0-31 was the current weeks sunday
                              if (
                                messageDate.toLocaleDateString() ===
                                today.toLocaleDateString()
                              ) {
                                // If the message is from today, display the time
                                return messageDate.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                });
                              } else if (messageDate >= startOfWeek) {
                                // If the message is from this week, display the day of the week
                                return messageDate.toLocaleDateString("en-US", {
                                  weekday: "long",
                                });
                              } else {
                                // If the message is older than a week, display the full date
                                return messageDate.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
                              }
                            })() //() immediately invokes the function
                          ) : (
                            <span> </span>
                          )}
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
      </section>
    </div>
  );
};

export default ChatSidebar;
