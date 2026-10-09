import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../../prisma/db";
import { getReadTime } from "@/app/lib/timeHelpers";
import { createReplySchema } from "@/app/lib/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = createReplySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 },
      );
    }

    const readTime = getReadTime();

    const post = await db.reply.create({
      data: {
        content: parsedBody.data.content,
        postId: parsedBody.data.postId,
        userId: session.user.id,
        readTime: readTime.toString(),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create reply api error" },
      { status: 500 },
    );
  }
}
