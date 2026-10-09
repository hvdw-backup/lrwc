import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { getSessionUserId } from "@/app/lib/server";

interface ContextProps {
  params: Promise<{
    replyid: string;
  }>;
}

export async function DELETE(request: Request, context: ContextProps) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { replyid } = await context.params;
    const existingReply = await db.reply.findUnique({
      where: { id: replyid },
      select: { userId: true },
    });

    if (!existingReply || existingReply.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.reply.delete({
      where: {
        id: replyid,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "delete reply api error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: ContextProps) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { replyid } = await context.params;
    const existingReply = await db.reply.findUnique({
      where: { id: replyid },
      select: { userId: true },
    });

    if (!existingReply || existingReply.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    await db.reply.update({
      where: {
        id: replyid,
      },
      data: {
        content: body.content,
      },
    });

    return NextResponse.json(
      { message: "updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error + "update reply api error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request, context: ContextProps) {
  try {
    const { replyid } = await context.params;
    const post = await db.reply.findFirst({
      where: {
        id: replyid,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update reply" },
      { status: 500 },
    );
  }
}
