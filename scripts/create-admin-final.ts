import { createClient } from "@libsql/client/web";
import { nanoid } from "nanoid";

const TURSO_URL = "libsql://satyaganita-anfal.aws-ap-northeast-1.turso.io";
const TURSO_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzYxMzE4ODYsImlkIjoiMDE5ZDc4MWUtZTUwMS03MGMxLWJhZDUtZGE5NmNmOTVjOTk0IiwicmlkIjoiNWZkNzE3ZTctZDk0OC00ZGQ2LTg4ZjAtODcwNmFlMzg5NDExIn0.G6jKgVsyBPHYu6lEV9ZRh86ul2blUVH4BQxpX1NhnluWfX6N5UzODroaNwLKyEMV-mHhEIRpOjLk6NMFmZy-Dw";

async function createAdminUser() {
  try {
    const client = createClient({
      url: TURSO_URL,
      authToken: TURSO_AUTH_TOKEN,
    });

    const ADMIN_ID = nanoid();

    await client.execute({
      sql: `INSERT INTO user (id, name, email, email_verified, role, banned, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [ADMIN_ID, "Admin Satya Ganita", "admin@satyaganita.id", 1, "admin", 0]
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@satyaganita.id");
    console.log("\n📋 Login Details:");
    console.log("   URL: http://localhost:3000/admin");
    console.log("   Email: admin@satyaganita.id");
    console.log("\n⚠️  IMPORTANT: Set up password through authentication system!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
