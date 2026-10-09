import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { getReadTime } from "@/app/lib/timeHelpers";
import { createReplySchema } from "@/app/lib/validators";
import { getSessionUserId, parseJsonBody } from "@/app/lib/server";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parsedBody = await parseJsonBody(request, createReplySchema);

    if (parsedBody instanceof NextResponse) {
      return parsedBody;
    }

    const readTime = getReadTime();

    const post = await db.reply.create({
      data: {
        content: parsedBody.data.content,
        postId: parsedBody.data.postId,
        userId,
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
