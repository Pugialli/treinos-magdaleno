import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'
import type { CreateAndUpdateExerciciosTreino } from '@/app/api/treinos/create-treino'

import { api } from './api-client'

interface UpdateTreinoRequest {
  idTreino: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

type UpdateTreinoResponse = GetTreinoResponse

export async function updateTreino({
  idTreino,
  exercicios,
}: UpdateTreinoRequest): Promise<UpdateTreinoResponse> {
  return await api
    .put(`treinos/${idTreino}`, {
      json: {
        idTreino,
        exercicios,
      },
    })
    .json<GetTreinoResponse>()
}
