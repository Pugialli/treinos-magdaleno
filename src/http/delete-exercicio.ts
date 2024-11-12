'use server'

import { revalidateTag } from 'next/cache'

import type { GetExercicioResponse } from '@/app/api/exercicios/[id]/get-exercicio'

import { api } from './api-client'

export async function deleteExercicio(id: string) {
  return await api
    .delete(`exercicios/${id}`, {})
    .json<GetExercicioResponse>()
    .then((exercicio) => {
      revalidateTag(`${exercicio.idProfessor}/exercicios`)
    })
}
