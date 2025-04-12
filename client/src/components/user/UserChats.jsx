import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatSidebar from "../ui/vo/ChatSidebar";
import ChatView from "../ui/vo/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { getChatById, getUserChats } from "@/store/user/action";
import { getUserProfile } from "@/store/auth/action";
import { RESET_SELECTED_CHAT } from "@/store/user/actionType";

import { LoaderCircle } from "lucide-react";

//Left side displays all chats, last message and unread count.  (Maybe message image)
//Right side displays the chat top sender profile maybe option to call and maybe on clicking sender profile can see other properties

const UserChats = ({ user }) => {
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  /*   const userChats = useSelector((state) => state.user.userChats);
  const SelectedChat = useSelector((state) => state.user.selectedChat);
  const Status = useSelector((state) => state.user.status); */

  const { userChats, selectedChat: SelectedChat } = useSelector(
    (state) => state.user
  );
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
  //Wrapping it with async ensures both run in order, and sidebar gets up-to-date info right after opening the chat.
  /*  const handleChatSelect = (chatId) => {
    dispatch(getUserChats()); // Refresh chat list to update unread counts

    dispatch(getChatById(chatId)); // Fetch chat details and update selectedChat
    setIsMobileViewOpen(true); // Open chat view
    navigate(`/user/chat/${chatId}`, { replace: true }); //replace doesnt cause page reload
  }; */

  const [isLoading, setIsLoading] = useState(false);

  const handleChatSelect = async (chatId) => {
    try {
      setIsLoading(true);
      setIsMobileViewOpen(true);
      navigate(`/user/chat/${chatId}`, { replace: true });
      await dispatch(getChatById(chatId));
      await dispatch(getUserChats());

      // Then refresh the chat list to update unread indicators
      //  ;
    } catch (error) {
      console.error("Error selecting chat:", error);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center bg-white mx-2 h-full rounded-lg gap-x-2">
            <LoaderCircle className="size-6 animate-spin" />
            <div className="text-center">
              <p className="text-estate-500 text-xl">Loading chat...</p>
            </div>
          </div>
        ) : (
          <ChatView
            chat={SelectedChat}
            userId={user?.id}
            onClose={handleCloseChat}
          />
        )}
      </div>
    </div>
  );
};

export default UserChats;

/*  {SelectedChat ? (
          <ChatView
            chat={SelectedChat}
            onClose={handleCloseChat}
            userId={user?.id}
          />
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center bg-white mx-2 h-full rounded-lg gap-x-1">
            <LoaderCircle className="size-6 " />
            <div className="text-center">
              <p className="text-estate-500">Loading chat...</p>
            </div>
          </div>
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
        )} */
