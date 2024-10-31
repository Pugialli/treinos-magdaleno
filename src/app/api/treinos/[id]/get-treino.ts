import { prisma } from '@/lib/prisma'

interface GetTreinoProps {
  id: string
}

export interface GetTreinoResponse {
  treino: {
    id: string
    createdAt: Date
    idAluno: string
    exercicios: {
      id: string
      ordem: number
      carga: string | null
      repeticoes: number
      series: number
      descanso: string | null
      isometria: string | null
      obs: string | null
      exercicio: {
        nome: string
        categoria: string
        orientacao: string
        fotos: {
          id: string
          avatarUrl: string
        }[]
      }
    }[]
  } | null
}

export async function getTreino({ id }: GetTreinoProps) {
  return await prisma.treino.findUnique({
    select: {
      id: true,
      createdAt: true,
      exercicios: {
        select: {
          id: true,
          carga: true,
          descanso: true,
          isometria: true,
          ordem: true,
          obs: true,
          repeticoes: true,
          series: true,
          exercicio: {
            select: {
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
      idAluno: true,
    },
    where: {
      id,
    },
  })
}
