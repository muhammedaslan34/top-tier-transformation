const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: ".env.local" });

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.adminUser.findFirst();
    
    if (existingAdmin) {
      console.log("Admin user already exists. Email:", existingAdmin.email);
      console.log("If you want to create a new one, please delete the existing user first.");
      return;
    }

    // Create admin user with the provided password hash
    const passwordHash = "$2b$10$TpqvPRs.LjHY0jg45iz5o.dQLUFQltBAKQ62j5MoHWUuzckv9ndNq";
    
    const admin = await prisma.adminUser.create({
      data: {
        email: "admin@tttech.com.sa", // You can change this email
        password: passwordHash,
        name: "Admin User",
      },
    });

    console.log("\n✅ Admin user created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: Muhammed*Aslan@8294@2891999");
    console.log("\n⚠️  Please keep your password secure!\n");
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
