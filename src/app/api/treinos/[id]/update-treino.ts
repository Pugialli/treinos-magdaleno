import { prisma } from '@/lib/prisma'

import type { CreateAndUpdateExerciciosTreino } from '../create-treino'

export interface UpdateTreinoProps {
  idTreino: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

export async function updateTreino({
  idTreino,
  exercicios,
}: UpdateTreinoProps) {
  const exerciciosAtualizados = await Promise.all(
    exercicios.map(async (exercicio) => {
      if (exercicio.id) {
        return await prisma.exercicioTreino.update({
          where: {
            id: exercicio.id,
          },
          data: {
            idExercicio: exercicio.idExercicio,
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
      } else {
        return await prisma.exercicioTreino.create({
          data: {
            idExercicio: exercicio.idExercicio,
            idTreino,
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
      }
    }),
  )

  return { exerciciosAtualizados }
}
