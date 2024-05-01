"use server";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateHash = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

// export const passwordsMatch = await bcrypt.compare(dbPassword, userEnteredPassword);
