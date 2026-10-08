import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

interface ContextProps {
  params: Promise<{
    userid: string;
  }>;
}

//TODO: handle case where someone tries to delete an existing user - not allowed (?)
export async function DELETE(request: Request, context: ContextProps) {
  try {
    const { userid } = await context.params;
    await db.approvedUsers.delete({
      where: {
        id: userid,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error + ": delete user api error" },
      { status: 500 },
    );
  }
}
