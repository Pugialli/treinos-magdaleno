import { prisma } from '@/lib/prisma'

interface GetAlunoProps {
  id: string
}

export interface GetExercicioResponse {
  id: string
  nome: string
  idProfessor: string
  categoria: string
  orientacao: string
}

export async function getExercicio({ id }: GetAlunoProps) {
  return await prisma.exercicio.findUnique({
    where: {
      id,
    },
  })
}
