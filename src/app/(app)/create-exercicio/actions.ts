'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { loggedUser } from '@/auth/auth'
import { createExercicio } from '@/http/create-exercicio'
import { updateExercicio } from '@/http/update-exercicio'
import { type Passo, passosToOrientacao } from '@/utils/orientacao-passos'

const exercicioSchema = z.object({
  nome: z
    .string()
    .min(4, { message: 'O nome do exercício deve ter ao menos 4 letras' }),
  categoria: z.string(),
  orientacoes: z.array(
    z.object({
      ordem: z.number(),
      orientacao: z.string(),
    }),
    {
      message: 'Deve haver pelo menos um passo',
    },
  ),
  id: z.string().optional(),
})

function formatData(data: FormData) {
  const entries = Object.fromEntries(data)

  // Inicializa o array de orientações
  const orientacoes: Passo[] = []

  Object.keys(entries).forEach((key) => {
    const ordemMatch = key.match(/^orientacoes\[(\d+)\]\.ordem$/)
    const orientacaoMatch = key.match(/^orientacoes\[(\d+)\]\.orientacao$/)

    if (ordemMatch) {
      const index = parseInt(ordemMatch[1], 10)
      const ordem = Number(entries[key])
      orientacoes[index] = { ...orientacoes[index], ordem }
    }

    if (orientacaoMatch) {
      const index = parseInt(orientacaoMatch[1], 10)
      const textoOrientacao = entries[key] as string
      orientacoes[index] = {
        ...orientacoes[index],
        orientacao: textoOrientacao,
      }
    }
  })

  return {
    ...entries,
    orientacoes, // Garante que `orientacoes` seja compatível com o schema
  }
}

export async function createExercicioAction(data: FormData) {
  const user = await loggedUser()

  const idProfessor = user!.id

  const result = exercicioSchema.safeParse(formatData(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { nome, categoria, orientacoes } = result.data

  const orientacaoConcat = passosToOrientacao(orientacoes)

  try {
    await createExercicio({
      nome,
      idProfessor,
      categoria,
      orientacao: orientacaoConcat,
    })

    revalidateTag(`${idProfessor}/exercicios`)
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
    message: 'Exercício criado com sucesso',
    errors: null,
  }
}

export async function updateExercicioAction(data: FormData) {
  const user = await loggedUser()

  const idProfessor = user!.id

  const result = exercicioSchema.safeParse(formatData(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { id, nome, categoria, orientacoes } = result.data

  const orientacaoConcat = passosToOrientacao(orientacoes)

  try {
    if (id) {
      await updateExercicio({
        id,
        nome,
        categoria,
        orientacao: orientacaoConcat,
      })

      revalidateTag(`${idProfessor}/exercicios`)
    }
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
    message: 'Exercício atualizado com sucesso',
    errors: null,
  }
}
