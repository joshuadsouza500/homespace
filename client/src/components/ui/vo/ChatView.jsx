import { useState } from "react";
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

const ChatView = ({ chat, onClose }) => {
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would normally send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-full flex-1 flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          {chat.avatar ? (
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div
              className="avatar-circle w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white font-semibold"
              style={{
                backgroundColor: chat.id === "a" ? "#FF5A5A" : "#7065F0",
              }}
            >
              {chat.initialLetter}
            </div>
          )}
          <h2 className="text-lg font-semibold">{chat.name}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-Primary transition-colors">
            <MessageSquareMore className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-Primary transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors "
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#f7f6fc] gray-50">
        <ChatMessage
          content="Hi, I saw your listing for the max-w-[75%]  apartment.   you like to schedule a viewing?  Is it still the available?"
          timestamp="2:20 PM"
          isReceived={false}
        />

        <ChatMessage
          content="Yes, it is still available. Would you like to schedule a viewing? I would like to schedule a viewing next week I would like to schedule a viewing next week"
          timestamp="3:05 PM"
          isReceived={true}
          sender="Sarah Johnson"
        />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-Primary mr-2"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="chat-input = w-full border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-Primary "
          />
          <button
            type="submit"
            className="bg-Primary text-white p-2.5 rounded-full hover:bg-opacity-90 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
ChatView.propTypes = {
  chat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    id: PropTypes.string.isRequired,
    initialLetter: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ChatView;
