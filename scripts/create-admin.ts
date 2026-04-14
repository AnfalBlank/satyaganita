import { config } from "dotenv";
import { resolve } from "path";

// Load .env file
config({ path: resolve(__dirname, "../.env") });

import { db } from "../server/db";
import { user } from "../server/db/schema";
import { nanoid } from "nanoid";

async function createAdminUser() {
  try {
    const adminUser = {
      id: nanoid(),
      name: "Admin Satya Ganita",
      email: "admin@satyaganita.id",
      emailVerified: true,
      role: "admin",
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(user).values(adminUser);

    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminUser.email);
    console.log("\n📋 Login Details:");
    console.log("   URL: http://localhost:3000/admin");
    console.log("   Email: admin@satyaganita.id");
    console.log("\n⚠️  IMPORTANT: Set up password through 'Forgot Password' or OAuth login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
