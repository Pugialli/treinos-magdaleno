import { api } from './api-client'

interface TransferTreinoRequest {
  idTreino: string
  idAluno: string
}

type TransferTreinoResponse = void

export async function transferTreino({
  idTreino,
  idAluno,
}: TransferTreinoRequest): Promise<TransferTreinoResponse> {
  await api.patch(`treinos/${idTreino}`, {
    json: {
      idTreino,
      idAluno,
    },
  })
}
