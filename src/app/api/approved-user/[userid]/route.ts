import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

interface ContextProps {
  params: {
    userid: string;
  };
}

//TODO: handle if the user has written things, then what??
export async function DELETE(request: Request, context: ContextProps) {
  try {
    const { params } = context;
    console.log(params);
    await db.approvedUsers.delete({
      where: {
        id: params.userid,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error + "delete user api error" },
      { status: 500 }
    );
  }
}
