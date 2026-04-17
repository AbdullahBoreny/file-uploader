/*
  Warnings:

  - You are about to drop the column `link` on the `files` table. All the data in the column will be lost.
  - Added the required column `path` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "files_link_key";

-- DropIndex
DROP INDEX "folders_name_key";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "link",
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
