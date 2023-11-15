/*
  Warnings:

  - The primary key for the `matches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pairs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `matches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `pairs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "matches" DROP CONSTRAINT "matches_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "matches_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pairs" DROP CONSTRAINT "pairs_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pairs_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_username_key" ON "matches"("username");

-- CreateIndex
CREATE UNIQUE INDEX "pairs_roomId_key" ON "pairs"("roomId");
