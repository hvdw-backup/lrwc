import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "create post api error" },
      { status: 500 }
    );
  }
}
