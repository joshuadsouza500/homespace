import { useEffect, useState } from "react";

import ChatSidebar from "../ui/vo/ChatSidebar";
import ChatView from "../ui/vo/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats } from "@/store/user/action";

//Left side displays all chats, last message and unread count.  (Maybe message image)
//Right side displays the chat top sender profile maybe option to call and maybe on clicking sender profile can see other properties

const UserChats = ({ user }) => {
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const dispatch = useDispatch();
  const userChats = useSelector((state) => state.user.userChats);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserChats());
  }, [dispatch]);

  const handleCloseChat = () => {
    setIsMobileViewOpen(false);
  };
  const handleChatSelect = (chatId) => {
    //dispatch(getChatById(chatId))
    setActiveChat(chatId);
    setIsMobileViewOpen(true);
  };
  const selectedChat = activeChat
    ? userChats.find((chat) => chat.id === activeChat) || null
    : null;

  //Get chats dispatch here
  //Get specific chat when it is selected
  return (
    <div className=" flex flex-row max-w-7xl 2xl:max-w-[1640px]  min-h-screen overflow-hidden shadow-md pl-0.5">
      <div
        className={`
              ${isMobileViewOpen ? "hidden" : "block"} 
              md:block w-full md:w-auto 2xl:pr-1 2xl:border
            `}
      >
        <ChatSidebar
          chats={userChats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          userId={user?.id}
        />
      </div>

      {/* Chat view - only shown on mobile when a chat is selected */}
      <div
        className={`
              ${isMobileViewOpen ? "block" : "hidden"} 
              md:block flex-1
            `}
      >
        <ChatView
          chat={selectedChat}
          onClose={handleCloseChat}
          userId={user?.id}
        />
      </div>
    </div>
  );
};

export default UserChats;
