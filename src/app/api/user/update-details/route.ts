import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { signOut } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await db.user.update({
      where: {
        email: body.email,
      },
      data: {
        username: body.username,
        about: body.about,
        redeemed: true,
      },
    });
    await signOut();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create user api error" },
      { status: 500 }
    );
  }
}
