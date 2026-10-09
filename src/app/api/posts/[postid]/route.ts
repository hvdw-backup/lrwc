import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../../../prisma/db";

interface ContextProps {
  params: Promise<{
    postid: string;
  }>;
}

export async function DELETE(request: Request, context: ContextProps) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postid } = await context.params;
    const existingPost = await db.post.findUnique({
      where: { id: postid },
      select: { userId: true },
    });

    if (!existingPost || existingPost.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: postid,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "delete post api error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: ContextProps) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postid } = await context.params;
    const existingPost = await db.post.findUnique({
      where: { id: postid },
      select: { userId: true },
    });

    if (!existingPost || existingPost.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    await db.post.update({
      where: {
        id: postid,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(
      { message: "updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error + "update post api error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request, context: ContextProps) {
  try {
    const { postid } = await context.params;
    const post = await db.post.findFirst({
      where: {
        id: postid,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update post" },
      { status: 500 },
    );
  }
}
