import { prisma } from '@/lib/prisma'

export interface CreateTreinoProps {
  alunoSlug: string
  exercicios: {
    id: string
    ordem: number
    carga: string
    isometria?: string
    repeticoes?: number
    series: number
    descanso?: string
    obs?: string
  }[]
}

export async function createTreino({
  alunoSlug,
  exercicios,
}: CreateTreinoProps) {
  const aluno = await prisma.aluno.findUnique({
    where: {
      slug: alunoSlug,
    },
  })

  if (!aluno) return null

  const treino = await prisma.treino.create({
    data: {
      idAluno: aluno.id,
    },
  })

  if (!treino) return null

  const exerciciosTreino = exercicios.map(async (exercicio) => {
    return await prisma.exercicioTreino.create({
      data: {
        idExercicio: exercicio.id,
        idTreino: treino.id,

        ordem: exercicio.ordem,
        carga: exercicio.carga,
        isometria: exercicio.isometria,
        repeticoes: exercicio.repeticoes,
        series: exercicio.series,
        descanso: exercicio.descanso,
        obs: exercicio.obs,
      },
    })
  })

  return { treino, exerciciosTreino }
}
