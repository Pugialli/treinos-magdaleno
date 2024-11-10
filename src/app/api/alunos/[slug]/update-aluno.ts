import { prisma } from '@/lib/prisma'

export interface UpdateAlunoProps {
  nome: string
  objetivo: string
  slug: string
}

export async function updateAluno({ nome, objetivo, slug }: UpdateAlunoProps) {
  return await prisma.aluno.update({
    where: {
      slug,
    },
    data: {
      nome,
      objetivo,
    },
  })
}
