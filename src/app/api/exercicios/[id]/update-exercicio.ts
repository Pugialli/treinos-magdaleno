import { prisma } from '@/lib/prisma'

export interface UpdateExerciciosProps {
  id: string
  nome: string
  categoria: string
  orientacao: string
}

export async function updateExercicio({
  id,
  nome,
  categoria,
  orientacao,
}: UpdateExerciciosProps) {
  return await prisma.exercicio.update({
    where: {
      id,
    },
    data: {
      nome,
      categoria,
      orientacao,
    },
  })
}
