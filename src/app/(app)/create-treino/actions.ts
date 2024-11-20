'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino'
import { createTreino } from '@/http/create-treino'
import { updateTreino } from '@/http/update-treino'

const treinoSchema = z.object({
  idAluno: z
    .string({ required_error: 'O aluno não foi selecionado.' })
    .min(4, { message: 'O aluno não foi selecionado.' }),
  idTreino: z.string().nullable(),
  exercicios: z.array(
    z.object({
      id: z.string().nullable(),
      idExercicio: z
        .string({ required_error: 'O exercício não foi selecionado.' })
        .min(4, { message: 'O exercício não foi selecionado.' }),
      ordem: z.number(),
      carga: z.number().max(300, { message: 'A carga não pode passar de 300' }),
      repeticoes: z.number().optional(),
      series: z
        .number()
        .min(1, { message: 'O número de séries deve ser maior que 0' }),
      descansoMin: z.number().max(60, { message: 'Máximo de 60m' }).optional(),
      descansoSeg: z.number().max(60, { message: 'Máximo de 60s' }).optional(),
      isometriaMin: z.number().max(60, { message: 'Máximo de 60m' }).optional(),
      isometriaSeg: z.number().max(60, { message: 'Máximo de 60s' }).optional(),
      obs: z.string().optional(),
    }),
  ),
})

function flattenExerciciosTreino(
  conjugados: ExercicioFromTreino[][],
): ExercicioFromTreino[] {
  const flattened: ExercicioFromTreino[] = []

  conjugados.forEach((conjugado, conjugadoIndex) => {
    conjugado.forEach((exercicio, exercicioIndex) => {
      // Calcula a ordem com base no índice do conjugado e do exercício
      const ordem = conjugadoIndex + 1 + exercicioIndex / 10

      // Cria uma cópia do exercício com a nova ordem
      flattened.push({ ...exercicio, ordem })
    })
  })

  return flattened
}

function transformFormData(formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of formData.entries()) {
    const keys = key.split(/[.[\]]+/).filter(Boolean) // Divide a chave em partes
    let current = result

    keys.forEach((k, i) => {
      const isLast = i === keys.length - 1

      if (!isLast) {
        // Garante que o nível atual seja um objeto ou array, conforme apropriado
        if (!current[k]) {
          current[k] = isNaN(Number(keys[i + 1])) ? {} : []
        }
      } else {
        // Define o valor no nível mais interno
        if (k === 'idTreino' || (keys[0] === 'exercicios' && k === 'id')) {
          current[k] = value || null
        } else if (keys[0] === 'exercicios' && k === 'obs') {
          current[k] = value || ''
        } else {
          current[k] = isNaN(Number(value as string)) ? value : Number(value)
        }
      }

      current = current[k] as Record<string, unknown>
    })
  }

  // Ajusta o campo "exercicios" para ser um array plano
  if (Array.isArray(result.exercicios)) {
    result.exercicios = flattenExerciciosTreino(
      result.exercicios as ExercicioFromTreino[][],
    )
  }

  return result
}

export async function createTreinoAction(data: FormData) {
  const result = treinoSchema.safeParse(transformFormData(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { idAluno, exercicios } = result.data

  try {
    const treino = await createTreino({
      idAluno,
      exercicios,
    })

    revalidateTag(`${treino.aluno.idProfessor}/treinos`)
    revalidateTag(`treinos/${treino.aluno.slug}`)
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

export async function updateTreinoAction(data: FormData) {
  const result = treinoSchema.safeParse(transformFormData(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { idTreino, exercicios } = result.data

  try {
    if (idTreino) {
      const treino = await updateTreino({
        idTreino,
        exercicios,
      })

      revalidateTag(`${treino.aluno.idProfessor}/treinos`)
      revalidateTag(`treinos/${treino.aluno.slug}`)
      revalidateTag(`treino/${treino.id}`)
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
    message: 'Treino atualizado com sucesso',
    errors: null,
  }
}
