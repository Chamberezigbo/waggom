import dotenv from "dotenv";
dotenv.config();

import { prisma } from "./src/config/prisma.js";
import app from "./src/app.js";

async function main() {
  try {
    await prisma.$connect();
    const port = Number(process.env.PORT ?? 3000);
    const server = app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });

    const shutdown = async () => {
      console.log("Shutting down...");
      await prisma.$disconnect();
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Startup failure:", err);
    process.exit(1);
  }
}

main();