import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      },
    });
    console.log(post, "posting");
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create post" },
      { status: 500 }
    );
  }
}
