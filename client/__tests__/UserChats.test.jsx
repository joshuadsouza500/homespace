import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { userReducer } from "@/store/user/reducer";
import UserChats from "@/components/User/UserChat/UserChats";
// Mock ChatSidebar component
vi.mock("@/components/User/UserChat/ChatComponents/ChatSidebar", () => ({
  __esModule: true,
  default: vi.fn(({ chats, onChatSelect }) => (
    <div data-testid="chat-sidebar">
      {chats.map((chat) => (
        <div
          key={chat.id}
          data-testid="chat-item"
          onClick={() => onChatSelect(chat.id)}
        ></div>
      ))}
    </div>
  )),
}));

// Mock ChatView component
vi.mock("@/components/User/UserChat/ChatComponents/ChatView", () => ({
  __esModule: true,
  default: vi.fn(({ chat }) => (
    <div data-testid="chat-view">{chat ? chat.name : "No chat selected"}</div>
  )),
}));

// Mock Redux store
const initialState = {
  user: {
    userChats: [
      {
        id: "1",
        createdAt: "2025-03-20T07:52:06.393Z",
        lastMessage: "hi",
        lastMessageCreatedAt: "2025-04-25T10:17:02.261Z",
        messages: [
          {
            id: "1",
            content: "hi",
          },
        ],
        participants: [
          { id: "123", name: "Test User" },
          { id: "222", name: "Test User2" },
        ],
        participantsIds: ["123", "222"],
        unreadCounts: {
          1: 0,
          2: 1,
        },
      },
      {
        id: "2",
        createdAt: "2025-03-20T07:52:06.393Z",
        lastMessage: "sdfsdfhi",
        lastMessageCreatedAt: "2025-04-25T10:17:02.261Z",
        messages: [
          {
            id: "1",
            content: "hisdfgasdf",
          },
        ],
        participants: [
          { id: "123", name: "Test User" },
          { id: "213", name: "Test User2" },
        ],
        participantsIds: ["123", "213"],
        unreadCounts: {
          1: 0,
          2: 1,
        },
      },
    ],
    selectedChat: null,
    isLoading: false,
  },
};

const rootReducer = combineReducers({ user: userReducer });
const store = legacy_createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

// Mock useNavigate from react-router-dom
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("UserChats Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserChats />
        </BrowserRouter>
      </Provider>
    );
  });

  test("renders the UserChats page", () => {
    expect(screen.getByTestId("chat-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("chat-view")).toBeInTheDocument();
    expect(screen.getByText("No chat selected")).toBeInTheDocument();
  });

  test("navigates to the correct chat when a chat is clicked", () => {
    // Find all chat items in the sidebar
    const chatItems = screen.getAllByTestId("chat-item");
    fireEvent.click(chatItems[0]);

    // Assert that the mockedNavigate function was called with the correct chatId
    expect(mockedNavigate).toHaveBeenCalledWith("/user/chat/1", {
      replace: true,
    });
  });
});
