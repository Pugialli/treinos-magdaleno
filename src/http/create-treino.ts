interface CreateTreinoRequest {
  name: string
  description: string
}

type CreateTreinoResponse = void

export async function createTreino({
  name,
  description,
}: CreateTreinoRequest): Promise<CreateTreinoResponse> {
  // await api.post('treinos', {
  //   json: {
  //     name,
  //     description,
  //   },
  // })

  console.log(name, description)
}
