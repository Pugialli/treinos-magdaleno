'use server'

import type { GetAlunoResponse } from '@/app/api/alunos/[slug]/get-aluno'

import { api } from './api-client'

export async function getAlunos(idProfessor: string) {
  const result = await api
    .get(`professor/${idProfessor}/alunos`, {
      next: {
        tags: [`${idProfessor}/alunos`],
      },
    })
    .json<GetAlunoResponse[]>()

  return result
}
