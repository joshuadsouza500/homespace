import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatSidebar from "../ui/vo/ChatSidebar";
import ChatView from "../ui/vo/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { getChatById, getUserChats } from "@/store/user/action";

//Left side displays all chats, last message and unread count.  (Maybe message image)
//Right side displays the chat top sender profile maybe option to call and maybe on clicking sender profile can see other properties

const UserChats = ({ user }) => {
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);

  const { chatId } = useParams();
  const dispatch = useDispatch();
  const userChats = useSelector((state) => state.user.userChats);
  const SelectedChat = useSelector((state) => state.user.selectedChat);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserChats());
  }, [dispatch]);

  useEffect(() => {
    if (chatId) {
      const existingChat = userChats.find((chat) => chat.id === chatId);
      if (existingChat) {
        dispatch(getChatById(chatId)); // Optional: If you want to ensure selectedChat is up-to-date
        // setIsMobileViewOpen(true); // Open mobile chat view
      }
    }
  }, [chatId, userChats, dispatch]);
  const handleCloseChat = () => {
    setIsMobileViewOpen(false);
  };

  const handleChatSelect = (chatId) => {
    dispatch(getChatById(chatId)); // Fetch chat details and update selectedChat
    setIsMobileViewOpen(true); // Open chat view
    history.push(`/user/chat/${chatId}`); // Navigate to the selected chat
  };
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
          activeChat={SelectedChat?.id}
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
          chat={SelectedChat}
          onClose={handleCloseChat}
          userId={user?.id}
        />
      </div>
    </div>
  );
};

export default UserChats;
