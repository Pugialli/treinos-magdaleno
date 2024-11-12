-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_id_professor_fkey";

-- DropForeignKey
ALTER TABLE "exercicios" DROP CONSTRAINT "exercicios_id_professor_fkey";

-- DropForeignKey
ALTER TABLE "exercicios_treinos" DROP CONSTRAINT "exercicios_treinos_id_exercicio_fkey";

-- DropForeignKey
ALTER TABLE "exercicios_treinos" DROP CONSTRAINT "exercicios_treinos_id_treio_fkey";

-- DropForeignKey
ALTER TABLE "fotos" DROP CONSTRAINT "fotos_id_exercicio_fkey";

-- DropForeignKey
ALTER TABLE "treinos" DROP CONSTRAINT "treinos_id_aluno_fkey";

-- AddForeignKey
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicios_treinos" ADD CONSTRAINT "exercicios_treinos_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "exercicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicios_treinos" ADD CONSTRAINT "exercicios_treinos_id_treio_fkey" FOREIGN KEY ("id_treio") REFERENCES "treinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicios" ADD CONSTRAINT "exercicios_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "exercicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
