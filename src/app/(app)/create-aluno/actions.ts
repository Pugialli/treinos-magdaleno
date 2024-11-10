'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { loggedUser } from '@/auth/auth'
import { createAluno } from '@/http/create-aluno'
import { updateAluno } from '@/http/update-aluno'

const alunoSchema = z.object({
  nome: z.string().min(4, { message: 'O nome deve ter ao menos 4 letras' }),
  objetivo: z.string(),
  slug: z.string().optional(),
})

export async function createAlunoAction(data: FormData) {
  const user = await loggedUser()

  const result = alunoSchema.safeParse(Object.fromEntries(data))

  const idProfessor = user!.id

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { nome, objetivo } = result.data

  try {
    await createAluno({
      nome,
      objetivo,
      idProfessor,
    })

    revalidateTag(`${idProfessor}/alunos`)
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
    message: 'Aluno criado com sucesso',
    errors: null,
  }
}

export async function updateAlunoAction(data: FormData) {
  const user = await loggedUser()

  const result = alunoSchema.safeParse(Object.fromEntries(data))

  const idProfessor = user!.id

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { nome, objetivo, slug } = result.data

  try {
    if (slug) {
      await updateAluno({
        nome,
        objetivo,
        alunoSlugo: slug,
      })

      revalidateTag(`${idProfessor}/alunos`)
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
    message: 'Aluno atualizado com sucesso',
    errors: null,
  }
}
