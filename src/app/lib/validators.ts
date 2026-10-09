import { z } from "zod";
import { isValidEmail } from "./helpers";

export const createPostSchema = z.object({
  title: z.string().trim().min(1).max(225),
  content: z.string().trim().min(1).max(4000),
});

export const createReplySchema = z.object({
  content: z.string().trim().min(1).max(3000),
  postId: z.string().min(1),
});

export const createApprovedUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .refine(isValidEmail, "Please provide a valid email address"),
});
