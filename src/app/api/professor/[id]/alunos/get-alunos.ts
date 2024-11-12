import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

export interface GetAlunosWithTreinoResponse {
  id: string
  slug: string
  nome: string
  idProfessor: string
  objetivo: string
  treinos: {
    id: string
    createdAt: Date
  }[]
}

export async function getAlunos({ idProfessor }: GetAlunosProps) {
  return await prisma.aluno.findMany({
    where: {
      idProfessor,
    },
    select: {
      id: true,
      idProfessor: true,
      nome: true,
      objetivo: true,
      slug: true,
      treinos: {
        select: {
          id: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
