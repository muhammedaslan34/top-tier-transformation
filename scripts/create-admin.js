const { hash } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

async function createAdmin() {
  const prisma = new PrismaClient();

  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: "admin@tttech.com.sa" },
    });

    if (existingAdmin) {
      console.log("Admin user already exists. Email:", existingAdmin.email);
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

    console.log("\n✅ Admin user created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: admin123");
    console.log("\n⚠️  Please change the password after first login!\n");
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
