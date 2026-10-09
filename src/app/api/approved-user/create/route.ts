import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../../prisma/db";
import { createApprovedUserSchema } from "@/app/lib/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = createApprovedUserSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 },
      );
    }

    const user = await db.approvedUsers.create({
      data: {
        email: parsedBody.data.email,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create approved user api error" },
      { status: 500 },
    );
  }
}
