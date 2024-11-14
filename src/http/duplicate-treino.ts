import { api } from './api-client'

interface DuplicateTreinoRequest {
  idTreino: string
  idAluno: string
}

type DuplicateTreinoResponse = void

export async function duplicateTreino({
  idTreino,
  idAluno,
}: DuplicateTreinoRequest): Promise<DuplicateTreinoResponse> {
  await api.patch(`treinos/${idTreino}`, {
    json: {
      idTreino,
      idAluno,
    },
  })
}
