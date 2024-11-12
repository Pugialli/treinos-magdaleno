'use server'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'

import { api } from './api-client'

export async function getExercicios(idProfessor: string) {
  const result = await api
    .get(`professor/${idProfessor}/exercicios`, {
      next: {
        tags: [`${idProfessor}/exercicios`],
      },
    })
    .json<GetExercicioResponse[]>()

  return result
}
