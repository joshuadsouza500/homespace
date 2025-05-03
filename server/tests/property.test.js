import request from "supertest";
import { vi, describe, expect, beforeEach, test } from "vitest";
import app from "../app.js";
import propertyService from "../src/Service/propertyService.js";
import prisma from "../src/lib/Prisma.js";
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

/* Testing User Routes */
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

/* Unit Tests for individual services */
describe("propertyService.createProperty", () => {
  test("should create a property successfully", async () => {
    const mockUserId = "1234";
    const mockData = {
      title: "Test Property",
      description: "A beautiful property",
      price: 100000,
      address: "123 Test Street",
      city: "Test City",
      image: ["image1.jpg", "image2.jpg"],
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      type: "Apartment",
      property_type: "Residential",
      utilities: ["Electricity", "Water"],
      furnishing: "Furnished",
      amenities: ["Pool", "Gym"],
    };

    // Mock the Prisma `create` method
    vi.spyOn(prisma.property, "create").mockResolvedValue({
      id: "1",
      ...mockData,
    });

    const result = await propertyService.createProperty(mockUserId, mockData);

    expect(result).toEqual({
      id: "1",
      ...mockData,
    });
  });
});

describe("propertyService.saveProperty", () => {
  test("should save a property successfully", async () => {
    const mockUserId = "1234";
    const mockPropertyId = "1";

    // Mock Prisma `findUnique` and `create` methods
    vi.spyOn(prisma.savedProperty, "findUnique").mockResolvedValue(null); // No existing saved property
    vi.spyOn(prisma.savedProperty, "create").mockResolvedValue({
      userId: mockUserId,
      propertyId: mockPropertyId,
    });

    const result = await propertyService.saveProperty(
      mockUserId,
      mockPropertyId
    );

    expect(result).toEqual({
      message: "Property saved successfully",
      savedProperty: {
        userId: mockUserId,
        propertyId: mockPropertyId,
      },
    });
  });
});
