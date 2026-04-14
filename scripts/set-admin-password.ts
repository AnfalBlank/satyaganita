import { createClient } from "@libsql/client/web";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

const TURSO_URL = "libsql://satyaganita-anfal.aws-ap-northeast-1.turso.io";
const TURSO_AUTH_TOKEN =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzU4NDAwNDUsImlkIjoiMDE5ZDc4MWUtZTUwMS03MGMxLWJhZDUtZGE5NmNmOTVjOTk0IiwicmlkIjoiNWZkNzE3ZTctZDk0OC00ZGQ2LTg4ZjAtODcwNmFlMzg5NDExIn0.p3oK1tXzACwAw0uD1jTLhWDV7Qw40yFrdjSylKD2oPcPn9RaYca385hXeZnWnGTF6JvRq-t0cH2qVrEBE_E0Cw";

async function setAdminPassword() {
  try {
    const client = createClient({
      url: TURSO_URL,
      authToken: TURSO_AUTH_TOKEN,
    });

    const ADMIN_EMAIL = "admin@satyaganita.id";
    const NEW_PASSWORD = "passwordmanggala"; // Default password

    // First, get the admin user by email
    const userResult = await client.execute({
      sql: `SELECT id FROM user WHERE email = ?`,
      args: [ADMIN_EMAIL],
    });

    if (!userResult.rows[0]) {
      console.log("⚠️  No admin user found with email:", ADMIN_EMAIL);
      console.log("   Pastikan admin user sudah dibuat sebelumnya.");
      process.exit(1);
    }

    const userId = userResult.rows[0].id as string;

    // Check if account exists for this user with email provider
    const accountResult = await client.execute({
      sql: `SELECT id FROM account WHERE user_id = ? AND provider_id = ?`,
      args: [userId, "email"],
    });

    // Hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, saltRounds);

    if (accountResult.rows[0]) {
      // Update existing account
      const accountId = accountResult.rows[0].id as string;

      await client.execute({
        sql: `UPDATE account SET password = ? WHERE id = ?`,
        args: [hashedPassword, accountId],
      });

      console.log("✅ Admin password updated successfully!");
    } else {
      // Create new account with password
      await client.execute({
        sql: `INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        args: [nanoid(), ADMIN_EMAIL, "email", userId, hashedPassword],
      });

      console.log("✅ Admin account created with password!");
    }

    console.log("\n📋 Login Details:");
    console.log("   URL: http://localhost:3000/admin");
    console.log("   Email: " + ADMIN_EMAIL);
    console.log("   Password: " + NEW_PASSWORD);
    console.log(
      "\n⚠️  IMPORTANT: Ganti password setelah first login untuk keamanan!",
    );
    console.log("   💡 Tips: Password default bisa diubah di script ini");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting admin password:", error);
    process.exit(1);
  }
}

setAdminPassword();
