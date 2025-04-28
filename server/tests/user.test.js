import request from "supertest";
import { vi, describe, expect, beforeEach, test } from "vitest";
import userService from "../src/Service/userService.js";
import prisma from "../src/lib/Prisma.js";
import bcrypt from "bcrypt";
import app from "../app.js";
// Mock the verifyToken middleware
vi.mock("../src/middleware/verifyToken.js", () => ({
  default: vi.fn((req, res, next) => {
    req.user = {
      id: "1234",
      name: "Test User",
      email: "test@email.com",
    }; // Mock user data

    next();
  }),
}));

vi.mock("../src/Controller/userController.js", async () => {
  const actual = await vi.importActual("../src/Controller/userController.js");
  return {
    default: {
      ...actual.default, // Spread the real implementation
      getUserProfile: vi.fn((req, res) => {
        return res.status(200).send({
          id: "1234",
          name: "Test User",
          email: "test@email.com",
        }); // Mocked response
      }),
      getUserProperties: vi.fn((req, res) => {
        return res.status(200).send({
          properties: [
            { id: "1", name: "Property 1" },
            { id: "2", name: "Property 2" },
          ],
        });
      }),
      getUserChats: vi.fn((req, res) => {
        return res.status(200).send({
          userChats: [
            { id: "1", participats: ["User 1", "User 2"] },
            { id: "2", participats: ["User 1", "User 4"] },
          ],
        });
      }),
    },
  };
});

//Need to set Authorization header to test the routes since verifyToken extracts jwt from it
describe("User Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("GET /user/profile - should return user profile", async () => {
    const response = await request(app)
      .get("/api/user/profile")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: "1234",
      name: "Test User",
      email: "test@email.com",
    });
  });

  test("GET /user/property - should return user properties", async () => {
    const response = await request(app)
      .get("/api/user/profile/property")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      properties: [
        { id: "1", name: "Property 1" },
        { id: "2", name: "Property 2" },
      ],
    });
  });

  test("GET /user/chat - should return users chats", async () => {
    const response = await request(app)
      .get("/api/user/profile/chat")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userChats: [
        { id: "1", participats: ["User 1", "User 2"] },
        { id: "2", participats: ["User 1", "User 4"] },
      ],
    });
  });
});

/*  UNIT TESTS */

describe("userService.updateUser", () => {
  test("should update user successfully", async () => {
    const mockUserId = "1234";
    const mockReqData = {
      name: "Updated User",
      email: "updated@email.com",
      mobile: "1234567890",
      password: "newpassword",
      role: "USER",
      company: null,
      avatar: "avatar.png",
    };

    // Mock bcrypt.hash
    vi.spyOn(bcrypt, "hash").mockResolvedValue("hashedpassword");

    // Mock Prisma `update` method
    //mockResolvedValue returns a resolved promise with predefined values to simulate the behavior of the Prisma client
    vi.spyOn(prisma.user, "update").mockResolvedValue({
      id: mockUserId,
      ...mockReqData,
      password: "hashedpassword",
    });

    const result = await userService.updateUser(mockUserId, mockReqData);

    expect(result).toEqual({
      id: mockUserId,
      ...mockReqData,
      password: "hashedpassword",
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: {
        name: "Updated User",
        email: "updated@email.com",
        mobile: "1234567890",
        password: "hashedpassword",
        role: "USER",
        company: null,
        avatar: "avatar.png",
      },
    });
  });

  test("should throw an error if user update fails", async () => {
    const mockUserId = "1234";
    const mockReqData = { name: "Updated User" };

    // Mock Prisma `update` to throw an error
    vi.spyOn(prisma.user, "update").mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      userService.updateUser(mockUserId, mockReqData)
    ).rejects.toThrow("Could not update user data.");
  });
});

describe("userService.getUserChatById", () => {
  test("should return chat details successfully", async () => {
    const mockUserId = "1234";
    const mockChatId = "5678";

    const mockChat = {
      id: mockChatId,
      participantsIds: ["1234", "5678"],
      unreadCounts: { 1234: 5, 5678: 2 },
      participants: [
        { id: "1234", name: "User 1" },
        { id: "5678", name: "User 2" },
      ],
      messages: [
        {
          id: "msg1",
          content: "Hello",
          senderId: "1234",
          createdAt: new Date(),
        },
      ],
    };

    // Mock Prisma `findFirst` method
    vi.spyOn(prisma.chat, "findFirst").mockResolvedValue(mockChat);

    // Mock Prisma `update` method
    vi.spyOn(prisma.chat, "update").mockResolvedValue({
      ...mockChat,
      unreadCounts: { 1234: 0, 5678: 2 },
    });

    const result = await userService.getUserChatById(mockUserId, mockChatId);

    expect(result).toEqual({ chat: mockChat });
    expect(prisma.chat.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockChatId,
        participantsIds: {
          has: mockUserId,
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    expect(prisma.chat.update).toHaveBeenCalledWith({
      where: { id: mockChatId },
      data: {
        unreadCounts: { 1234: 0, 5678: 2 },
      },
    });
  });
});

// NODE_OPTIONS=--experimental-vm-modules jest
