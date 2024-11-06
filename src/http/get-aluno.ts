'use server'

import { api } from './api-client'

interface GetAlunoResponse {
  id: string
  idProfessor: string
  nome: string
  slug: string
  objetivo: string
  createdAt: string
}

export async function getAluno(alunoSlug: string) {
  const result = await api
    .get(`alunos/${alunoSlug}`, {
      next: {
        tags: [`aluno/${alunoSlug}`],
      },
    })
    .json<GetAlunoResponse>()

  return result
}
