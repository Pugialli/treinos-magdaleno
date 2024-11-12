'use server'

import type { GetTreinoFromProfessorResponse } from '@/app/api/professor/[id]/treinos/get-treinos-professor'

import { api } from './api-client'

export async function getTreinosFromProfessor(idProfessor: string) {
  return await api
    .get(`professor/${idProfessor}/treinos`, {
      next: {
        tags: [`${idProfessor}/treinos`],
      },
    })
    .json<GetTreinoFromProfessorResponse[]>()
}
