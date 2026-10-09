import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../../prisma/db";
import { getReadTime } from "@/app/lib/timeHelpers";
import { createPostSchema } from "@/app/lib/validators";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = createPostSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 },
      );
    }

    const readTime = getReadTime();

    const post = await db.post.create({
      data: {
        title: parsedBody.data.title,
        content: parsedBody.data.content,
        userId: session.user.id,
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
