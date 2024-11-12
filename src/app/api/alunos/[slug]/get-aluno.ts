import { prisma } from '@/lib/prisma'

interface GetAlunoProps {
  slug: string
}

export interface GetAlunoResponse {
  id: string
  idProfessor: string
  slug: string
  nome: string
  objetivo: string
  createdAt: string
}

export async function getAluno({ slug }: GetAlunoProps) {
  return await prisma.aluno.findUnique({
    where: {
      slug,
    },
  })
}
