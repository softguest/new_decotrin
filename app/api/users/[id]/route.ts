import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth"; // <-- Import auth

// GET - Fetch a post only if the user has subscribed
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

//   const userId = session.user.id;
  const userId = params.id;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}