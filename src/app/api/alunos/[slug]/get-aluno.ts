import { prisma } from '@/lib/prisma'

interface GetAlunoProps {
  slug: string
}

export interface GetAlunoResponse {
  aluno: {
    id: string
    idProfessor: string
    slug: string
    nome: string
    objetivo: string
    createdAt: string
  } | null
}

export async function getAluno({ slug }: GetAlunoProps) {
  return await prisma.aluno.findUnique({
    where: {
      slug,
    },
  })
}
