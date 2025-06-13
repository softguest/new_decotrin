import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuid()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), "public/uploads", filename);

  fs.writeFileSync(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
};
