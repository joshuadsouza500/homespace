import request from "supertest";
import { vi, describe, expect, beforeEach, test } from "vitest";
// Import the app after mocking
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

// NODE_OPTIONS=--experimental-vm-modules jest
