import { prisma } from '@/lib/prisma'

interface GetTreinosFromProfessorProps {
  idProfessor: string
}

export interface GetTreinoFromProfessorResponse {
  id: string
  createdAt: Date
  aluno: {
    id: string
    nome: string
    slug: string
  }
  exercicios: {
    id: string
    idTreino: string
    idExercicio: string
    ordem: number
    carga: string | null
    repeticoes: number | null
    series: number
    descanso: string | null
    isometria: string | null
    obs: string | null
  }[]
}

export async function getTreinosFromProfessor({
  idProfessor,
}: GetTreinosFromProfessorProps) {
  return await prisma.treino.findMany({
    where: {
      aluno: {
        idProfessor,
      },
    },
    select: {
      id: true,
      createdAt: true,
      exercicios: true,
      aluno: {
        select: {
          id: true,
          nome: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
