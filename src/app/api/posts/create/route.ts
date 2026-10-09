import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { getReadTime } from "@/app/lib/timeHelpers";
import { createPostSchema } from "@/app/lib/validators";
import { getSessionUserId, parseJsonBody } from "@/app/lib/server";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parsedBody = await parseJsonBody(request, createPostSchema);

    if (parsedBody instanceof NextResponse) {
      return parsedBody;
    }

    const readTime = getReadTime();

    const post = await db.post.create({
      data: {
        title: parsedBody.data.title,
        content: parsedBody.data.content,
        userId,
        readTime: readTime.toString(),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create post api error" },
      { status: 500 },
    );
  }
}
