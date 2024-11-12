import { api } from './api-client'

interface UpdateExercicioRequest {
  id: string
  nome: string
  categoria: string
  orientacao: string
}

type UpdateExercicioResponse = void

export async function updateExercicio({
  id,
  nome,
  categoria,
  orientacao,
}: UpdateExercicioRequest): Promise<UpdateExercicioResponse> {
  await api.patch(`exercicios/${id}`, {
    json: {
      id,
      nome,
      categoria,
      orientacao,
    },
  })
}
