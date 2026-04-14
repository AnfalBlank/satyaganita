import { config } from "dotenv";
import { resolve } from "path";

// Load .env file
config({ path: resolve(__dirname, "../.env") });

import { nanoid } from "nanoid";

async function resetAdmin() {
  try {
    const { db } = await import("../server/db");
    const { user, account } = await import("../server/db/schema");
    const { eq } = await import("drizzle-orm");
    const bcrypt = await import("bcrypt");

    const ADMIN_EMAIL = "admin@satyaganita.id";
    const NEW_PASSWORD = "passwordmanggala";

    console.log("Menghapus data lama...");
    // Temukan user
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, ADMIN_EMAIL)
    });

    if (existingUser) {
      await db.delete(user).where(eq(user.id, existingUser.id));
      await db.delete(account).where(eq(account.userId, existingUser.id));
      console.log("Data lama dihapus.");
    }

    // Buat ulang dengan metode dari better-auth atau db langsung
    console.log("Membuat admin baru yang 100% kompatibel dengan Better Auth...");
    
    // Harus sama dengan standar better-auth 1.0!
    const newUserId = nanoid();
    const ts = new Date();
    
    await db.insert(user).values({
      id: newUserId,
      name: "Admin Satya Ganita",
      email: ADMIN_EMAIL,
      emailVerified: true,
      role: "admin",
      banned: false,
      createdAt: ts,
      updatedAt: ts,
    });

    // Hash password kompatibel bcrypt
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);
    const accountId = nanoid();

    await db.insert(account).values({
      id: accountId,
      accountId: ADMIN_EMAIL, // In some Better Auth versions, accountId is the identifier for credential
      providerId: "credential", // PENTING: Untuk plugin emailAndPassword harus 'credential'
      userId: newUserId,
      password: hashedPassword,
      createdAt: ts,
      updatedAt: ts,
    });

    console.log("✅ Admin berhasil dibuat ulang (Full Reset)!");
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${NEW_PASSWORD}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal reset:", error);
    process.exit(1);
  }
}

resetAdmin();
