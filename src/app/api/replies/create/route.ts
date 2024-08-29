import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { getReadTime } from "@/app/lib/getReadTime";

export async function POST(request: Request) {
  try {
    const readTime = getReadTime();

    const body = await request.json();
    const post = await db.reply.create({
      data: {
        content: body.content,
        postId: body.postId,
        userId: body.userId,
        readTime: readTime.toString(),
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create reply api error" },
      { status: 500 }
    );
  }
}
