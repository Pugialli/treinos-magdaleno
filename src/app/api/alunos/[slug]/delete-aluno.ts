import { prisma } from '@/lib/prisma'

interface DeleteAlunoProps {
  slug: string
}

export async function deleteAluno({ slug }: DeleteAlunoProps) {
  return await prisma.aluno.delete({
    where: {
      slug,
    },
  })
}
