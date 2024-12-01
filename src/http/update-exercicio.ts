import { api } from './api-client'

interface UpdateExercicioRequest {
  id: string
  nome: string
  categoria: string
  orientacao: string
  fotos: {
    ordem: number
    avatarUrl: string
  }[]
}

type UpdateExercicioResponse = void

export async function updateExercicio({
  id,
  nome,
  categoria,
  orientacao,
  fotos,
}: UpdateExercicioRequest): Promise<UpdateExercicioResponse> {
  await api.patch(`exercicios/${id}`, {
    json: {
      id,
      nome,
      categoria,
      orientacao,
      fotos,
    },
  })
}
