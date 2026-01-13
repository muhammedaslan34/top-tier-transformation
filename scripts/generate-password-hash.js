const { hash } = require("bcryptjs");

async function generateHash() {
  const password = process.argv[2];
  
  if (!password) {
    console.error("Usage: node generate-password-hash.js <password>");
    process.exit(1);
  }

  const hashedPassword = await hash(password, 10);
  console.log("\nPassword hash generated:");
  console.log(hashedPassword);
  console.log("\nAdd this to your .env.local file:");
  console.log(`ADMIN_PASSWORD_HASH="${hashedPassword}"\n`);
}

generateHash().catch(console.error);
