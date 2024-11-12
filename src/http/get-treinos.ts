'use server'

import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'

import { api } from './api-client'

export async function getTreinos(alunoSlug: string) {
  const result = await api
    .get(`alunos/${alunoSlug}/treinos`, {
      next: {
        tags: [`treinos/${alunoSlug}`],
      },
    })
    .json<GetTreinoResponse[]>()

  return result
}
