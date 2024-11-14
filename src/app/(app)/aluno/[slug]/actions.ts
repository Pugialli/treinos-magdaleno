'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { duplicateTreino } from '@/http/duplicate-treino'

const duplicateTreinoSchema = z.object({
  idAluno: z.string(),
  idTreino: z.string(),
})

export async function duplicateTreinoAction(data: FormData) {
  const result = duplicateTreinoSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { idAluno, idTreino } = result.data

  try {
    await duplicateTreino({
      idAluno,
      idTreino,
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
    message: 'Treino duplicado com sucesso',
    errors: null,
  }
}
