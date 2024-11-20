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
    select: {
      id: true,
      createdAt: true,
      exercicios: {
        select: {
          id: true,
          carga: true,
          descansoMin: true,
          descansoSeg: true,
          isometriaMin: true,
          isometriaSeg: true,
          ordem: true,
          obs: true,
          repeticoes: true,
          series: true,
          exercicio: {
            select: {
              id: true,
              nome: true,
              categoria: true,
              orientacao: true,
              fotos: {
                select: {
                  id: true,
                  avatarUrl: true,
                },
                orderBy: {
                  ordem: 'asc',
                },
              },
            },
          },
        },
        orderBy: {
          ordem: 'asc',
        },
      },
      aluno: {
        select: {
          id: true,
          nome: true,
          slug: true,
          idProfessor: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
