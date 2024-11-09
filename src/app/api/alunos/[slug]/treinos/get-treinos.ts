import { prisma } from '@/lib/prisma'

import { getAluno } from '../get-aluno'

interface GetTreinosProps {
  slug: string
}

export async function getTreinos({ slug }: GetTreinosProps) {
  const aluno = await getAluno({ slug })

  if (!aluno) return null

  return await prisma.treino.findMany({
    where: {
      idAluno: aluno.id,
    },
    include: {
      exercicios: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
