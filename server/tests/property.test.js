import request from "supertest";
import { vi, describe, expect, beforeEach, test } from "vitest";
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

vi.mock("../src/Controller/propertyController.js", async () => {
  const actual = await vi.importActual(
    "../src/Controller/propertyController.js"
  );
  return {
    default: {
      ...actual.default, // Spread the real implementation
      getPropertyById: vi.fn((req, res) => {
        return res.status(201).send({
          id: "2424",
          title: "Test Property",
          isSaved: false,
          user: {
            id: "123",
          },
        }); // Mocked response
      }),
      saveProperty: vi.fn((req, res) => {
        return res.status(201).send({
          id: "154",
          title: "Test Property",
          isSaved: true,
          user: {
            id: "1223",
          },
        });
      }),
    },
  };
});

describe("Property Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Get property by id", async () => {
    const response = await request(app)
      .get("/api/property/2424")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "2424",
      title: "Test Property",
      isSaved: false,
      user: {
        id: "123",
      },
    });
  });
  test("Save a  property ", async () => {
    const response = await request(app)
      .post("/api/property/saved")
      .set("Authorization", "Bearer mock.Token.kk"); // Simulate sending a token
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "154",
      title: "Test Property",
      isSaved: true,
      user: {
        id: "1223",
      },
    });
  });
});
