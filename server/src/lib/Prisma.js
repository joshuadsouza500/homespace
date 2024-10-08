import { PrismaClient } from "@prisma/client";

//Tell prisma to log all database queries Useful WHEN debugging
const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

export default prisma;
