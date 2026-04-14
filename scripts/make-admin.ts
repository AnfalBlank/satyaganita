import { config } from "dotenv";
import { resolve } from "path";

// Load .env file
config({ path: resolve(__dirname, "../.env") });

async function makeAdmin() {
  try {
    const { db } = await import("../server/db");
    const { user } = await import("../server/db/schema");
    const { eq } = await import("drizzle-orm");

    const ADMIN_EMAIL = "admin1@satyaganita.id";

    console.log("Mencari akun", ADMIN_EMAIL, "...");
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, ADMIN_EMAIL)
    });

    if (!existingUser) {
      console.log("❌ Akun tidak ditemukan! Silakan daftar (Sign Up) dulu melalui halaman web.");
      process.exit(1);
    }

    console.log("Akun ditemukan! Mengubah hak akses menjadi Admin...");
    await db.update(user).set({ role: "admin" }).where(eq(user.id, existingUser.id));

    console.log("✅ Berhasil! Akun Anda kini memiliki hak akses Administrator.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal update:", error);
    process.exit(1);
  }
}

makeAdmin();
