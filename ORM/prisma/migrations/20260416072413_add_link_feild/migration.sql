/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_link_key" ON "files"("link");
