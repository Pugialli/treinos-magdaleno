'use server'

import { api } from './api-client'

interface GetProfessorResponse {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export async function getProfessor(id: string) {
  const result = await api
    .get(`professor/${id}`, {
      next: {
        tags: [`professor/${id}`],
      },
    })
    .json<GetProfessorResponse>()

  return result
}
