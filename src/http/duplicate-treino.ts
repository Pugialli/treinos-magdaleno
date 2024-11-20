import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'

import { api } from './api-client'

interface DuplicateTreinoRequest {
  idTreino: string
  idAluno: string
}

type DuplicateTreinoResponse = GetTreinoResponse

export async function duplicateTreino({
  idTreino,
  idAluno,
}: DuplicateTreinoRequest): Promise<DuplicateTreinoResponse> {
  return await api
    .patch(`treinos/${idTreino}`, {
      json: {
        idTreino,
        idAluno,
      },
    })
    .json<GetTreinoResponse>()
}
