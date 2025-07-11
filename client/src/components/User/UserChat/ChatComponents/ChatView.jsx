import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  MessageSquare,
  Phone,
  X,
  Paperclip,
  Send,
  MessageSquareMore,
} from "lucide-react";
import ChatMessage from "./ChatMessage";
import { io } from "socket.io-client";
import { Deployment, LocalHost } from "@/config/apiConfig";

const ChatView = ({ chat, userId, onClose }) => {
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState(""); //used for message input
  const [allMessages, setAllMessages] = useState([]); //Used to store all the messages
  const [status, setStatus] = useState(false);
  const endOfMessagesRef = useRef(null);

  const otherParticipant = chat?.participants?.find(
    (participant) => participant.id !== userId
  );
  //const status = useSelector((state) => state.user.status);
  useEffect(() => {
    const newSocket = io(Deployment);
    setSocket(newSocket);
    newSocket.emit("joinRoom", chat?.id, userId);
    if (chat) {
      setAllMessages(chat.messages || []); // Set initial messages if they exist
    }
    // Handle incoming messages
    newSocket.on("receiveMessage", (newMessage) => {
      setAllMessages((prev) => [newMessage, ...prev]); //Latest messages will be added to the start of array
    });
    // Listen for the recipient joining the chat
    newSocket.on("userJoined", ({ userId: joinedUserId }) => {
      if (joinedUserId === otherParticipant?.id) {
        setStatus(true); // Update the online status
      }
    });
    newSocket.on("userLeft", ({ userId: InactiveUsersId }) => {
      if (InactiveUsersId === otherParticipant?.id) {
        setStatus(false); // Update the online status when user disconnects
      }
    });

    return () => {
      newSocket.off("receiveMessage");
      newSocket.off("userJoined");
      newSocket.off("userLeft");
      newSocket.disconnect(); // Optionally disconnect
    };
  }, [chat?.id]);

  const handleSubmit = () => {
    if (message.trim() && socket) {
      socket.emit("sendMessage", { userId, chatId: chat.id, message });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Check if the pressed key is "Enter"
      e.preventDefault(); // Prevent the default action (form submission)
      handleSubmit();
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]); // Effect will run every time messages change

  if (!otherParticipant) {
    return null; // Return nothing if there is no other participant
  }

  if (!chat) {
    return (
      <div className="h-full flex-1 flex items-center justify-center bg-gray-50 p-6 animate- fade-in">
        <div className="text-center max-w-md">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Select a conversation
          </h2>
          <p className="text-gray-500 dark:text-[#f8fdff]">
            Choose a conversation from the list to view messages or start a new
            one
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="h-full flex-1 flex flex-col bg-white animate-fade-in   rounded-lg shadow-xl backdrop-blur-md border-gray-100 border-[0.5px] dark:bg-[#121212] dark:border-[#49494b]">
      {/* Header */}
      <nav className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between shadow-sm dark:border-[#49494b]">
        <div className="flex items-center">
          {otherParticipant.avatar ? (
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="avatar-circle w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white font-semibold bg-Primary dark:text-[#f8fdff]">
              {otherParticipant.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col ">
            <h2 className="text-lg font-semibold capitalize dark:text-[#f8fdff]">
              {otherParticipant.name}
            </h2>
            {status ? (
              <div className="flex items-center justify-start pl-0.5 pt-0.5 gap-x-1 text-xs text-muted-foreground">
                <span className="bg-[#00A884]  size-[10px]  rounded-full " />
                <p className="leading-none">Active</p>
              </div>
            ) : (
              <div className="flex items-center justify-start pl-0.5 pt-0.5 gap-x-1 text-xs text-muted-foreground">
                <span className="bg-gray-200 dark:bg-[#4D4D4E] size-[10px]  rounded-full " />
                <p className="leading-none">Inactive</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-6 xl:pr-4">
          <button className="text-gray-500 dark:text-[#f8fdff] hover:text-Primary transition-colors">
            <Phone className="xl:size-6 size-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-[#f8fdff] hover:bg-gray-600/10 hover:text-red-400 rounded-full transition-colors p-0.5"
          >
            <X className="size-6" />
          </button>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-estate-50  dark:bg-[#1E1F21]">
        {allMessages
          .slice()
          .reverse()
          .map((msg, index) => {
            const isLastFromOther =
              index === 0 ||
              (msg.senderId === otherParticipant.id &&
                allMessages[allMessages.length - (index + 2)]?.senderId !==
                  otherParticipant.id);
            return (
              <ChatMessage
                key={index}
                message={msg}
                timestamp={new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                isReceived={msg.senderId !== userId}
                sender={msg.senderId === userId ? "You" : otherParticipant.name}
                otherParticipant={isLastFromOther ? otherParticipant : null} // Set avatar only for the last message from other participant
              />
            );
          })}
        <div ref={endOfMessagesRef} />{" "}
        {/*PLaced at the bottom of messages list so it can scroll into view to the bottom most text */}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-100 shadow dark:border-[#49494b]">
        <div className="flex items-center gap-x-2 2xl:gap-x-4">
          <button
            type="button"
            className="text-gray-500 dark:text-[#f8fdff] hover:text-Primary "
          >
            <Paperclip className="xl:size-6 size-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Add the key down event handler
            placeholder="Type a message"
            className="chat-input w-full border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-Primary flex-1 dark:bg-[#222222] dark:border-[#49494b] dark:text-[#F8FDFF]"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-Primary text-white p-2.5 2xl:p-3 rounded-full hover:bg-opacity-90 transition-all "
          >
            <Send className="xl:size-6 size-5 " />
          </button>
        </div>
      </div>
    </section>
  );
};
ChatView.propTypes = {
  chat: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    id: PropTypes.string,
    initialLetter: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

export default ChatView;

/*
 *  when typing when they type so animate it and show 3 dots for other user
 */
