'use server'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'

import { api } from './api-client'

export async function getExercicio(id: string) {
  const result = await api.get(`exercicios/${id}`).json<GetExercicioResponse>()

  return result
}
