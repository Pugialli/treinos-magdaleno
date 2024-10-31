'use server'

import { api } from './api-client'

interface GetAlunoResponse {
  id: string
  nome: string
  objetivo: string
  createdAt: string
}

export async function getAluno(alunoId: string) {
  const result = await api
    .get(`alunos/${alunoId}`, {
      next: {
        tags: [`aluno/${alunoId}`],
      },
    })
    .json<GetAlunoResponse>()

  return result
}
