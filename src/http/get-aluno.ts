'use server'

import { api } from './api-client'

export interface GetAlunoResponse {
  id: string
  idProfessor: string
  nome: string
  slug: string
  objetivo: string
  createdAt: string
}

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
