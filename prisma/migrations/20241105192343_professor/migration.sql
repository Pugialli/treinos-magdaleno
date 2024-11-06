/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `alunos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_professor` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_professor` to the `exercicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "id_professor" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "exercicios" ADD COLUMN     "id_professor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "alunos_slug_key" ON "alunos"("slug");

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicios" ADD CONSTRAINT "exercicios_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
