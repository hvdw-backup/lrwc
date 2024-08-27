import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

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

    await db.approvedUsers.update({
      where: {
        email: body.email,
      },
      data: {
        redeemed: true,
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
