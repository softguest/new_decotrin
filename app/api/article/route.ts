import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || session.user.role !== 'COACHE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }

  let imageUrl = "";

  if (file && file.name) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads allowed" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${uuidv4()}-${cleanFileName}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    } catch (err) {
      return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
    }
  }

  try {
    const post = await db.article.create({
      data: {
        title,
        content, // Serialized Editor.js or Lexical JSON
        image: imageUrl || null,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json({ error: "Failed to save article" }, { status: 500 });
  }
}
