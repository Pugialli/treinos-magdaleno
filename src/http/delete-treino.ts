'use server'

import { revalidateTag } from 'next/cache'

import type { DeleteTreinoResponse } from '@/app/api/treinos/[id]/delete-treino'

import { api } from './api-client'

export async function deleteTreino(id: string) {
  return await api
    .delete(`treinos/${id}`)
    .json<DeleteTreinoResponse>()
    .then((treino) => {
      revalidateTag(`${treino.aluno.idProfessor}/treinos`)
    })
}
