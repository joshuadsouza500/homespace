import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatSidebar from "../ui/vo/ChatSidebar";
import ChatView from "../ui/vo/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { getChatById, getUserChats } from "@/store/user/action";
import { getUserProfile } from "@/store/auth/action";
import { RESET_SELECTED_CHAT } from "@/store/user/actionType";

import { SearchIcon } from "lucide-react";

//Left side displays all chats, last message and unread count.  (Maybe message image)
//Right side displays the chat top sender profile maybe option to call and maybe on clicking sender profile can see other properties

const UserChats = ({ user }) => {
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const userChats = useSelector((state) => state.user.userChats);
  const SelectedChat = useSelector((state) => state.user.selectedChat);
  //st user = useSelector((store) => store.auth.user);
  // Use useEffect to fetch user properties when the component mounts

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getUserChats());
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (chatId) {
      const existingChat = userChats.find((chat) => chat.id === chatId);
      if (existingChat) {
        dispatch(getChatById(chatId)); // Optional: If you want to ensure selectedChat is up-to-date
        // setIsMobileViewOpen(true); // Open mobile chat view
      }
    }
    return () => {
      dispatch({ type: RESET_SELECTED_CHAT }); // Clear selected chat on unmount
    };
  }, [chatId, userChats, dispatch]);
  const handleCloseChat = () => {
    setIsMobileViewOpen(false);
    navigate(`/user/chat/`, { replace: true });
  };

  const handleChatSelect = (chatId) => {
    dispatch(getChatById(chatId)); // Fetch chat details and update selectedChat
    setIsMobileViewOpen(true); // Open chat view
    navigate(`/user/chat/${chatId}`, { replace: true }); //replace doesnt cause page reload
  };

  return (
    <div className=" flex max-w-7xl 2xl:max-w-[1640px]  h-screen  shadow-md pl- 0.5 bg-estate-50">
      <div
        className={`
              ${isMobileViewOpen ? "hidden" : "block"} 
              md:block w-full md:w-auto  
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
              md:block flex-1 max-md:pt-14 m-2 
            `}
      >
        {SelectedChat ? (
          <ChatView
            chat={SelectedChat}
            onClose={handleCloseChat}
            userId={user?.id}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500  bg-white mx-2  capitalize shadow-lg  h-full  rounded-lg">
            <div className="text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center mx-auto">
                <SearchIcon className="h-8 w-8 text-Primary dark:text-azure-400" />
              </div>
              <h3 className="text-xl font-medium text-estate-800 dark:text-white mb-2">
                No chat selected
              </h3>
              <p className="text-estate-500 dark:text-estate-400 max-w-md tracking-wide">
                Select a conversation from the list to view messages
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChats;
