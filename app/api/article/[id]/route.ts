import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { auth } from "@/auth"; // <-- Import auth

// GET - Fetch a post only if the user has subscribed
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const articleId = params.id;

  const article = await db.article.findUnique({
    where: { id: articleId },
    include: {
      author: true,
    },
  });

  if (!article) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

// PUT - Update a post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  const subject = await db.article.findUnique({
    where: { id: params.id },
    include: {
      author: true,
    },
  });

  if (!subject) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (subject.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }


  let newImageUrl = subject.image;

  // Handle image upload
  if (file && file.name) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    newImageUrl = `/uploads/${fileName}`;

    // Delete old image
    if (subject.image) {
      const oldImagePath = path.join(process.cwd(), "public", subject.image.replace(/^\/+/, ''));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  }

  const updatedArticle = await db.article.update({
    where: { id: params.id },
    data: {
      title,
      content,
      image: newImageUrl,
    },
  });

  return NextResponse.json(updatedArticle);
}
