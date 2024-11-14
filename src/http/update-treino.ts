import type { CreateAndUpdateExerciciosTreino } from '@/app/api/treinos/create-treino'

import { api } from './api-client'

interface UpdateTreinoRequest {
  idTreino: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

type UpdateTreinoResponse = void

export async function updateTreino({
  idTreino,
  exercicios,
}: UpdateTreinoRequest): Promise<UpdateTreinoResponse> {
  await api.put(`treinos/${idTreino}`, {
    json: {
      idTreino,
      exercicios,
    },
  })
}
