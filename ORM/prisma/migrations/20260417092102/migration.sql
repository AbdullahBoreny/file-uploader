/*
  Warnings:

  - You are about to drop the column `path` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `folders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `folders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_parentId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "path",
ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "parentId";

-- CreateIndex
CREATE UNIQUE INDEX "files_link_key" ON "files"("link");

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_key" ON "folders"("name");
