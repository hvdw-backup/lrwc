import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

interface ContextProps {
  params: {
    postid: string;
  };
}

export async function DELETE(request: Request, context: ContextProps) {
  try {
    const { params } = context;
    await db.post.delete({
      where: {
        id: params.postid,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "delete post api error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: ContextProps) {
  try {
    const { params } = context;
    const body = await request.json();

    await db.post.update({
      where: {
        id: params.postid,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(
      { message: "updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error + "update post api error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, context: ContextProps) {
  try {
    const { params } = context;
    const post = await db.post.findFirst({
      where: {
        id: params.postid,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update post" },
      { status: 500 }
    );
  }
}
