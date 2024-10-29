-- CreateTable
CREATE TABLE "treinos" (
    "id" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alunos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercicio_treino" (
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

    CONSTRAINT "exercicio_treino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "orientacao" TEXT NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" TEXT NOT NULL,
    "id_exercicio" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicio_treino" ADD CONSTRAINT "exercicio_treino_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicio_treino" ADD CONSTRAINT "exercicio_treino_id_treio_fkey" FOREIGN KEY ("id_treio") REFERENCES "treinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
