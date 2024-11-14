/*
  Warnings:

  - You are about to drop the column `descanso` on the `exercicios_treinos` table. All the data in the column will be lost.
  - You are about to drop the column `isometria` on the `exercicios_treinos` table. All the data in the column will be lost.
  - The `carga` column on the `exercicios_treinos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "exercicios_treinos" DROP COLUMN "descanso",
DROP COLUMN "isometria",
ADD COLUMN     "descanso_min" INTEGER,
ADD COLUMN     "descanso_seg" INTEGER,
ADD COLUMN     "isometria_min" INTEGER,
ADD COLUMN     "isometria_seg" INTEGER,
DROP COLUMN "carga",
ADD COLUMN     "carga" INTEGER;
