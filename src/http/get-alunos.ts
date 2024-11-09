'use server'

import { api } from './api-client'

export interface GetAlunosResponse {
  id: string
  idProfessor: string
  nome: string
  slug: string
  objetivo: string
  createdAt: string
  treinos: {
    id: string
    createdAt: string
  }[]
}

export async function getAlunos(idProfessor: string) {
  const result = await api
    .get(`professor/${idProfessor}/alunos`, {
      next: {
        tags: [`${idProfessor}/alunos`],
      },
    })
    .json<GetAlunosResponse[]>()

  return result
}
