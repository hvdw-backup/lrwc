import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await db.approvedUsers.create({
      data: {
        email: body.email,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create approved user api error" },
      { status: 500 }
    );
  }
}
