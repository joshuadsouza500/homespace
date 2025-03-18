import { useState } from "react";

import ChatSidebar from "../ui/vo/ChatSidebar";
import ChatView from "../ui/vo/ChatView";

//Left side displays all chats, last message and unread count.  (Maybe message image)
//Right side displays the chat top sender profile maybe option to call and maybe on clicking sender profile can see other properties
const mockChats = [
  {
    id: "d",
    name: "Deccan Real Estate",
    avatar: "/placeholder.svg",
    initialLetter: "D",
    subtitle: "Real Estate Agency",
    lastMessage: "I have a question about the property.",
    time: "10:30 AM",
    unread: true,
    propertyInfo: {
      image: "/placeholder.svg",
      title: "Newly renovated | Luxury | Balcony | Special Offer",
      price: "BHD 380",
    },
  },
  {
    id: "s",
    name: "Sarah Johnson",
    avatar: null,
    initialLetter: "S",
    subtitle: "",
    lastMessage: "Is this property still available?",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "a",
    name: "Ahmed Al Sayed",
    avatar: null,
    initialLetter: "A",
    subtitle: "Prospective Buyer",
    lastMessage: "I would like to schedule a viewing next week",
    time: "Yesterday",
    unread: false,
    propertyInfo: {
      image: "/placeholder.svg",
      title: "Modern Apartment | City Center | 2BR",
      price: "BHD 450",
    },
  },
  {
    id: "m",
    name: "Michael Smith",
    avatar: null,
    initialLetter: "M",
    subtitle: "",
    lastMessage: "Thank you for the information.",
    time: "Monday",
    unread: false,
  },
  {
    id: "g",
    name: "Gulf Properties",
    avatar: "/placeholder.svg",
    initialLetter: "G",
    subtitle: "Property Management",
    lastMessage: "We have several new listings that match your criteria...",
    time: "Aug 25",
    unread: false,
    propertyInfo: {
      image: "/placeholder.svg",
      title: "Luxury Villa | Private Pool | 4BR",
      price: "BHD 1,200",
    },
  },
];
const UserChats = () => {
  const [isMobileViewOpen, setIsMobileViewOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const handleCloseChat = () => {
    setIsMobileViewOpen(false);
  };
  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setIsMobileViewOpen(true);
  };
  const selectedChat = activeChat
    ? mockChats.find((chat) => chat.id === activeChat) || null
    : null;
  return (
    <div className=" flex flex-row max-w-7xl 2xl:max-w-[1640px]  min-h-screen overflow-hidden shadow-md pl-1">
      <div
        className={`
              ${isMobileViewOpen ? "hidden" : "block"} 
              md:block w-full md:w-auto
            `}
      >
        <ChatSidebar
          chats={mockChats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
        />
      </div>

      {/* Chat view - only shown on mobile when a chat is selected */}
      <div
        className={`
              ${isMobileViewOpen ? "block" : "hidden"} 
              md:block flex-1
            `}
      >
        <ChatView chat={selectedChat} onClose={handleCloseChat} />
      </div>
    </div>
  );
};

export default UserChats;
