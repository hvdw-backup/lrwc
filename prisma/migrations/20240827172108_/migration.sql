/*
  Warnings:

  - You are about to drop the column `usernamename` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ApprovedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "usernamename",
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "ApprovedUsers";
