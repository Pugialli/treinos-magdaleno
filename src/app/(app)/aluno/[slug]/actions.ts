'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'
import { deleteTreino } from '@/http/delete-treino'
import { duplicateTreino } from '@/http/duplicate-treino'
import { getTreino } from '@/http/get-treino'

const duplicateTreinoSchema = z.object({
  idAluno: z.string().min(4, { message: 'Aluno não selecionado' }),
  idTreino: z.string(),
})

export async function duplicateTreinoAction(data: FormData) {
  const result = duplicateTreinoSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { idAluno, idTreino } = result.data

  let treino: GetTreinoResponse = await getTreino(idTreino)

  try {
    treino = await duplicateTreino({
      idAluno,
      idTreino,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    treino = await getTreino(idTreino)

    redirect(`/aluno/${treino.aluno.slug}?status=error`)
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos',
      errors: null,
    }
  }

  redirect(`/aluno/${treino.aluno.slug}?status=success`)
  return {
    success: true,
    message: 'Treino duplicado com sucesso',
    errors: null,
  }
}

export async function removeTreinoAction(treinoId: string) {
  await deleteTreino(treinoId)

  // revalidateTag(`${currentOrg}/members`)
}
