import { prisma } from '@/lib/prisma'

export interface CreateAndUpdateExerciciosTreino {
  id?: string | undefined | null
  idExercicio: string
  ordem: number
  carga?: number | undefined
  repeticoes?: number | undefined
  series: number
  descansoMin?: number | undefined
  descansoSeg?: number | undefined
  isometriaMin?: number | undefined
  isometriaSeg?: number | undefined
  obs?: string | undefined
}

export interface CreateTreinoProps {
  idAluno: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

export async function createTreino({ idAluno, exercicios }: CreateTreinoProps) {
  const treino = await prisma.treino.create({
    data: {
      idAluno,
    },
  })

  if (!treino) return null

  exercicios.map(async (exercicio) => {
    return await prisma.exercicioTreino.create({
      data: {
        idExercicio: exercicio.idExercicio,
        idTreino: treino.id,
        ordem: exercicio.ordem,
        series: exercicio.series,
        carga: exercicio.carga,
        descansoMin: exercicio.descansoMin,
        descansoSeg: exercicio.descansoSeg,
        isometriaMin: exercicio.isometriaMin,
        isometriaSeg: exercicio.isometriaSeg,
        repeticoes: exercicio.repeticoes,
        obs: exercicio.obs,
      },
    })
  })

  return { treino }
}
