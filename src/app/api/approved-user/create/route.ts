import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { createApprovedUserSchema } from "@/app/lib/validators";
import { getSessionUserId, parseJsonBody } from "@/app/lib/server";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parsedBody = await parseJsonBody(request, createApprovedUserSchema);

    if (parsedBody instanceof NextResponse) {
      return parsedBody;
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
