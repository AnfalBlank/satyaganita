// Simple script to create admin user using direct API call
const TURSO_URL = "libsql://satyaganita-anfal.aws-ap-northeast-1.turso.io";
const TURSO_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzU4NDAwNDUsImlkIjoiMDE5ZDc4MWUtZTUwMS03MGMxLWJhZDUtZGE5NmNmOTVjOTk0IiwicmlkIjoiNWZkNzE3ZTctZDk0OC00ZGQ2LTg4ZjAtODcwNmFlMzg5NDExIn0.p3oK1tXzACwAw0uD1jTLhWDV7Qw40yFrdjSylKD2oPcPn9RaYca385hXeZnWnGTF6JvRq-t0cH2qVrEBE_E0Cw";

async function createAdminUser() {
  try {
    const ADMIN_ID = `admin-${Date.now()}`;

    const response = await fetch(`${TURSO_URL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TURSO_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statements: [
          {
            q: `INSERT INTO user (id, name, email, email_verified, role, banned, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
            params: [ADMIN_ID, "Admin Satya Ganita", "admin@satyaganita.id", 1, "admin", 0]
          }
        ]
      })
    });

    if (response.ok) {
      console.log("✅ Admin user created successfully!");
      console.log("Email: admin@satyaganita.id");
      console.log("\n📋 Login Details:");
      console.log("   URL: http://localhost:3000/admin");
      console.log("   Email: admin@satyaganita.id");
      console.log("\n⚠️  IMPORTANT: Set up password through authentication system!");
    } else {
      console.error("❌ Failed to create admin user");
      const error = await response.text();
      console.error(error);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

createAdminUser();
