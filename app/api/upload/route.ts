import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.warn("Upload directory might already exist:", err);
    }

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename safely
      const uniqueId = nanoid(10);
      const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const filename = `${uniqueId}-${originalName}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, buffer);

      // Return the public URL
      const publicUrl = `/uploads/${filename}`;
      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({
      success: true,
      files: uploadedUrls.map((url) => ({
        url,
        // Mocking objectInfo format for backward compatibility with components if needed
        objectInfo: { key: url.replace(/^\//, "") },
      })),
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Something went wrong uploading the file." },
      { status: 500 }
    );
  }
}
