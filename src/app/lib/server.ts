import { NextResponse } from "next/server";
import { z } from "zod";

export async function getSessionUserId() {
  const mockSession = (globalThis as { __mockAuthSession?: { user?: { id?: string } } })
    .__mockAuthSession;

  if (mockSession) {
    return mockSession.user?.id ?? null;
  }

  try {
    const { auth } = await import("@/auth");
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    return session.user.id as string;
  } catch {
    return null;
  }
}

export async function parseJsonBody<T>(
  request: Request,
  schema: z.Schema<T>,
): Promise<{ data: T } | NextResponse> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0]?.message ?? "Invalid payload" },
        { status: 400 },
      );
    }

    return { data: result.data };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}
