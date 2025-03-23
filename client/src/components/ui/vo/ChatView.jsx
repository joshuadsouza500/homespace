import { useEffect, useState } from "react";
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

const ChatView = ({ chat, userId, onClose }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(""); //used for message input
  const [allMessages, setAllMessages] = useState([]); //Used to store all the messages

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("joinRoom", chat.id);
    if (chat) {
      setAllMessages(chat.messages || []); // Set initial messages if they exist
    }
    // Handle incoming messages
    newSocket.on("receiveMessage", (newMessage) => {
      setAllMessages((prev) => [newMessage, ...prev]); //Latest messages will be added to the start of array
    });

    return () => {
      newSocket.off("receiveMessage");
      newSocket.disconnect(); // Optionally disconnect
    };
  }, [chat.id]);

  const handleSubmit = () => {
    if (message.trim() && socket) {
      socket.emit("sendMessage", { userId, chatId: chat.id, message });
      setMessage("");
    }
  };

  const otherParticipant = chat?.participants?.find(
    (participant) => participant.id !== userId
  );

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
          <p className="text-gray-500">
            Choose a conversation from the list to view messages or start a new
            one
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="h-full flex-1 flex flex-col bg-white animate-fade-in  ">
      {/* Header */}
      <nav className="p-4 border-b border-gray-200 flex items-center justify-between ">
        <div className="flex items-center">
          {otherParticipant.avatar ? (
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="avatar-circle w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white font-semibold bg-Primary">
              {otherParticipant.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-lg font-semibold capitalize">
            {otherParticipant.name}
          </h2>
        </div>
        <div className="flex items-center gap-x-6">
          <button className="text-gray-500 hover:text-Primary transition-colors">
            <MessageSquareMore className="xl:size-6 size-5" />
          </button>
          <button className="text-gray-500 hover:text-Primary transition-colors">
            <Phone className="xl:size-6 size-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#f7f6fc]">
        {allMessages
          .slice()
          .reverse()
          .map((msg, index) => (
            <ChatMessage
              key={index}
              content={msg.content}
              timestamp={new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              isReceived={msg.senderId !== userId} // Message is considered received if sender is not the current user
              sender={msg.senderId === userId ? "You" : otherParticipant.name} // Show either "You" or the other participant's name
              otherParticipant={otherParticipant}
            />
          ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 ">
        <div className="flex items-center gap-x-2 ">
          <button type="button" className="text-gray-500 hover:text-Primary ">
            <Paperclip className="xl:size-6 size-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="chat-input w-full border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-Primary flex-1"
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
 * Unreadcounts and show unread messages
 *Mobile version
 * when sending new message animate it and show 3 dots for other user
 * When a new message is sent have a slight animation to bring it in, the chat view should automatically scroll to show the new message
 *When hovering overmessgae chevron options [copy, delete]
 * When clicking on a chat it shows from the top most(oldest message) . make it show most recent or bottom. And later on add pagination to messages with show more messages
 *  Maybe add otherparticipants avatar but only for last message they send and not for all messages => CHeck if [0] and [1] is from same sender ?
 *  Last message make it into date if its yesterday or previous
 * ✅ In latest message if you sent it make it you:messgae here
 * ✅ if unreadmessage exist make the last message bold
 */
