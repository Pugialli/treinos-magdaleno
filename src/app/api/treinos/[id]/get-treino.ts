import { prisma } from '@/lib/prisma'

interface GetTreinoProps {
  id: string
}

export interface ExercicioFromTreino {
  id: string
  ordem: number
  carga: number | null
  repeticoes: number | null
  series: number
  descansoMin: number | null
  descansoSeg: number | null
  isometriaMin: number | null
  isometriaSeg: number | null
  obs: string | null
  exercicio: {
    id: string
    nome: string
    categoria: string
    orientacao: string
    fotos: {
      id: string
      avatarUrl: string
    }[]
  }
}

export interface GetTreinoResponse {
  id: string
  createdAt: Date
  aluno: {
    id: string
    idProfessor: string
  }
  exercicios: ExercicioFromTreino[]
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
          idProfessor: true,
        },
      },
    },
    where: {
      id,
    },
  })
}
