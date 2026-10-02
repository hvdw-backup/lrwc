"use server";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const generateHash = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};
