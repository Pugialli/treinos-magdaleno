import { api } from './api-client'

interface CreateAlunoRequest {
  nome: string
  objetivo: string
  idProfessor: string
}

type CreateAlunoResponse = void

export async function createAluno({
  nome,
  objetivo,
  idProfessor,
}: CreateAlunoRequest): Promise<CreateAlunoResponse> {
  await api.post('alunos', {
    json: {
      nome,
      objetivo,
      idProfessor,
    },
  })
}
