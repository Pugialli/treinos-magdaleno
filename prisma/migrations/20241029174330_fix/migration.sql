/*
  Warnings:

  - You are about to drop the `Exercicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Foto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercicio_treino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Foto" DROP CONSTRAINT "Foto_id_exercicio_fkey";

-- DropForeignKey
ALTER TABLE "exercicio_treino" DROP CONSTRAINT "exercicio_treino_id_exercicio_fkey";

-- DropForeignKey
ALTER TABLE "exercicio_treino" DROP CONSTRAINT "exercicio_treino_id_treio_fkey";

-- DropTable
DROP TABLE "Exercicio";

-- DropTable
DROP TABLE "Foto";

-- DropTable
DROP TABLE "exercicio_treino";

-- CreateTable
CREATE TABLE "exercicios_treinos" (
    "id" TEXT NOT NULL,
    "id_treio" TEXT NOT NULL,
    "id_exercicio" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "carga" TEXT,
    "repeticoes" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "descanso" TEXT,
    "isometria" TEXT,
    "obs" TEXT,

    CONSTRAINT "exercicios_treinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercicios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "orientacao" TEXT NOT NULL,

    CONSTRAINT "exercicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" TEXT NOT NULL,
    "id_exercicio" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercicios_treinos" ADD CONSTRAINT "exercicios_treinos_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "exercicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicios_treinos" ADD CONSTRAINT "exercicios_treinos_id_treio_fkey" FOREIGN KEY ("id_treio") REFERENCES "treinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "exercicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
