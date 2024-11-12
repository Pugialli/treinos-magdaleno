import { prisma } from '@/lib/prisma'

interface DeleteExercicioProps {
  id: string
}

export async function deleteExercicio({ id }: DeleteExercicioProps) {
  return await prisma.exercicio.delete({
    where: {
      id,
    },
  })
}
