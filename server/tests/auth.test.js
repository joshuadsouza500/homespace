import request from "supertest";
import { vi, describe, expect, beforeEach, test } from "vitest";
import app from "../app.js";

vi.mock("../src/Controller/authController.js", async () => {
  const actual = await vi.importActual("../src/Controller/authController.js");
  return {
    default: {
      ...actual.default, // Spread the real implementation
      signup: vi.fn((req, res) => {
        return res.status(200).send({
          jwt: "mock.jwt.token",
          user: { id: "123", name: "Test User" },
          message: "User Sign up Success",
        });
        // Mocked response
      }),
      signin: vi.fn((req, res) => {
        return res.status(200).send({
          jwt: "mock.jwt.token",
          user: { id: "123", name: "Test User" },
          message: "User Sign in Success",
        });
        // Mocked response
      }),
    },
  };
});

//Need to set Authorization header to test the routes since verifyToken extracts jwt from it
describe("Auth Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("Sign Up", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      jwt: "mock.jwt.token",
      user: { id: "123", name: "Test User" },
      message: "User Sign up Success",
    });
  });

  test("Sign In", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      jwt: "mock.jwt.token",
      user: { id: "123", name: "Test User" },
      message: "User Sign in Success",
    });
  });
});
