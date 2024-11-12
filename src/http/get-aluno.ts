'use server'

import type { GetAlunoResponse } from '@/app/api/alunos/[slug]/get-aluno'

import { api } from './api-client'

export async function getAluno(alunoSlug: string | null) {
  const result = alunoSlug
    ? await api
        .get(`alunos/${alunoSlug}`, {
          next: {
            tags: [`aluno/${alunoSlug}`],
          },
        })
        .json<GetAlunoResponse>()
    : null

  return result
}
