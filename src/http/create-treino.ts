import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'
import type { CreateAndUpdateExerciciosTreino } from '@/app/api/treinos/create-treino'

import { api } from './api-client'

interface CreateTreinoRequest {
  idAluno: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

type CreateTreinoResponse = GetTreinoResponse

export async function createTreino({
  idAluno,
  exercicios,
}: CreateTreinoRequest): Promise<CreateTreinoResponse> {
  return await api
    .post('treinos', {
      json: {
        idAluno,
        exercicios,
      },
    })
    .json<GetTreinoResponse>()
}
