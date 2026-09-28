import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const filename = `${timestamp}-${originalName}`;
    
    // Ensure documents directory exists
    const documentsDir = path.join(process.cwd(), "public", "documents");
    if (!existsSync(documentsDir)) {
      await mkdir(documentsDir, { recursive: true });
    }

    // Save file
    const filepath = path.join(documentsDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    const url = `/documents/${filename}`;
    
    return NextResponse.json({ url, filename }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
