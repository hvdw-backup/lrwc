import { getSessionUserId, parseJsonBody } from "./server";
import { z } from "zod";

describe("getSessionUserId", () => {
  afterEach(() => {
    delete (globalThis as { __mockAuthSession?: unknown }).__mockAuthSession;
  });

  it("returns null when no user is signed in", async () => {
    (globalThis as { __mockAuthSession?: { user?: { id?: string } } | null }).__mockAuthSession = null;

    await expect(getSessionUserId()).resolves.toBeNull();
  });

  it("returns the session user id when authenticated", async () => {
    (globalThis as { __mockAuthSession?: { user?: { id?: string } } }).__mockAuthSession = {
      user: { id: "user-123" },
    };

    await expect(getSessionUserId()).resolves.toBe("user-123");
  });
});

describe("parseJsonBody", () => {
  const schema = z.object({
    title: z.string().min(1),
  });

  it("returns parsed data for a valid JSON body", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "hello" }),
      headers: { "Content-Type": "application/json" },
    });

    await expect(parseJsonBody(request, schema)).resolves.toMatchObject({
      data: { title: "hello" },
    });
  });

  it("returns a 400 response when the JSON body is invalid", async () => {
    const request = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "" }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await parseJsonBody(request, schema);

    expect(result).toBeInstanceOf(Response);
    expect((result as Response).status).toBe(400);
  });
});
