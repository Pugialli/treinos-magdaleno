import type { CreateAndUpdateExerciciosTreino } from '@/app/api/treinos/create-treino'

import { api } from './api-client'

interface CreateTreinoRequest {
  idAluno: string
  exercicios: CreateAndUpdateExerciciosTreino[]
}

type CreateTreinoResponse = void

export async function createTreino({
  idAluno,
  exercicios,
}: CreateTreinoRequest): Promise<CreateTreinoResponse> {
  await api.post('treinos', {
    json: {
      idAluno,
      exercicios,
    },
  })
}
