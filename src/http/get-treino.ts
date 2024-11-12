'use server'

import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'

import { api } from './api-client'

export async function getTreino(treinoId: string) {
  const result = await api
    .get(`treinos/${treinoId}`, {
      next: {
        tags: [`treino/${treinoId}`],
      },
    })
    .json<GetTreinoResponse>()

  return result
}
