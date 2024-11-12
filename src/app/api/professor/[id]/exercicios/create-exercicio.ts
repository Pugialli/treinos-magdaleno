import { prisma } from '@/lib/prisma'

export interface CreateExercicioProps {
  nome: string
  categoria: string
  orientacao: string
  idProfessor: string
}

export async function createExercicio({
  nome,
  categoria,
  orientacao,
  idProfessor,
}: CreateExercicioProps) {
  console.log({
    nome,
    categoria,
    orientacao,
    idProfessor,
  })
  return await prisma.exercicio.create({
    data: {
      nome,
      categoria,
      orientacao,
      idProfessor,
    },
  })
}
