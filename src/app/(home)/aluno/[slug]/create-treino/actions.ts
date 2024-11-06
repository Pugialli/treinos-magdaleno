'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createTreino } from '@/http/create-treino'

const treinoSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters' }),
  description: z.string(),
})

export async function createTreinoAction(data: FormData) {
  const result = treinoSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await createTreino({
      name,
      description,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Treino criado com sucesso',
    errors: null,
  }
}
