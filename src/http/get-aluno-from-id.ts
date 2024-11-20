'use server'

import type { GetAlunoResponse } from '@/app/api/alunos/[slug]/get-aluno'

import { api } from './api-client'

export async function getAlunoFromId(idAluno: string | null) {
  const result = idAluno
    ? await api
        .get(`alunos/${idAluno}`, {
          next: {
            tags: [`aluno/${idAluno}`],
          },
        })
        .json<GetAlunoResponse>()
    : null

  return result
}
