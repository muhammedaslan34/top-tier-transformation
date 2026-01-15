import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

const prisma = new PrismaClient();

async function main() {
  // Check if admin user already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: "admin@tttech.com.sa" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Skipping seed.");
    return;
  }

  // Create default admin user
  const hashedPassword = await hash("admin123", 10);

  const admin = await prisma.adminUser.create({
    data: {
      email: "admin@tttech.com.sa",
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("Admin user created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
