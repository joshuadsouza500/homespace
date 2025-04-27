import request from "supertest";
import app from "../app";
import { describe, expect, test } from "vitest";

//Supertest lets you pass the express app to it without needing to start the server , can test  status codes, res body, headers etc
describe("Returns the correct root response", () => {
  test("Should return hello world!", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200),
      expect(response.text).toBe("Hello World!");
  });
});
