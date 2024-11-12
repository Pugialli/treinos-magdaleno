import { prisma } from '@/lib/prisma'

interface DeleteTreinoProps {
  id: string
}

export interface DeleteTreinoResponse {
  aluno: {
    idProfessor: string
  }
}

export async function deleteTreino({ id }: DeleteTreinoProps) {
  return await prisma.treino.delete({
    where: {
      id,
    },
    select: {
      aluno: {
        select: {
          idProfessor: true,
        },
      },
    },
  })
}
