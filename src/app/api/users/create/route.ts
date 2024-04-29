import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await db.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: body.password,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create user api error" },
      { status: 500 }
    );
  }
}
