import { api } from './api-client'

interface CreateExercicioRequest {
  nome: string
  categoria: string
  orientacao: string
  idProfessor: string
  fotos: {
    ordem: number
    avatarUrl: string
  }[]
}

type CreateExercicioResponse = void

export async function createExercicio({
  nome,
  categoria,
  orientacao,
  fotos,
  idProfessor,
}: CreateExercicioRequest): Promise<CreateExercicioResponse> {
  await api.post(`professor/${idProfessor}/exercicios`, {
    json: {
      nome,
      categoria,
      orientacao,
      fotos,
      idProfessor,
    },
  })
}
