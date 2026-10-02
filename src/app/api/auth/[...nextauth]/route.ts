import { handlers } from "@/auth";

export const GET = async (...args: Parameters<typeof handlers.GET>) => {
  try {
    return await handlers.GET(...args);
  } catch (error) {
    console.error("[auth][GET] Unhandled route error", error);
    throw error;
  }
};

export const POST = async (...args: Parameters<typeof handlers.POST>) => {
  try {
    return await handlers.POST(...args);
  } catch (error) {
    console.error("[auth][POST] Unhandled route error", error);
    throw error;
  }
};
