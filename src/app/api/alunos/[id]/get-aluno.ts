import { prisma } from '@/lib/prisma'

interface GetAlunoProps {
  id: string
}

export interface GetAlunoResponse {
  aluno: {
    id: string
    nome: string
    objetivo: string
    createdAt: string
  } | null
}

export async function getAluno({ id }: GetAlunoProps) {
  return await prisma.aluno.findUnique({
    where: {
      id,
    },
  })
}
