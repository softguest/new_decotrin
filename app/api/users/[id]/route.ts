// app/api/users/[id]/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { role } = body;

  const user = await db.user.update({
    where: { id: params.id },
    data: { role },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await db.user.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "User deleted" });
}
