/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,id]` on the table `folders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "files_name_key";

-- DropIndex
DROP INDEX "folders_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "files_name_id_key" ON "files"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_id_key" ON "folders"("name", "id");
