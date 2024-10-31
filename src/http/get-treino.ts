import { api } from './api-client'

export interface Exercicio {
  id: string
  ordem: number
  carga: string | null
  repeticoes: number
  series: number
  descanso: string | null
  isometria: string | null
  obs: string | null
  exercicio: {
    nome: string
    categoria: string
    orientacao: string
  }
}

interface GetTreinoResponse {
  id: string
  createdAt: Date
  exercicios: Exercicio[]
}

export async function getTreino(treinoId: string) {
  const result = await api
    .get(`treinos/${treinoId}`, {
      next: {
        tags: [`treino/${treinoId}`],
      },
    })
    .json<GetTreinoResponse>()

  return result
}
