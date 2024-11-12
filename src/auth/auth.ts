import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getTreinosFromProfessor } from '@/http/get-all-treinos'
import { getAlunos } from '@/http/get-alunos'
import { getExercicios } from '@/http/get-exercicios'
import { getProfessor } from '@/http/get-professor'
import { getProfile } from '@/http/get-profile'
import { decrypt } from '@/utils/crypto'

export async function isAuthenticated() {
  return !!(await cookies()).get('treino-token')?.value
}

export async function logUserOut() {
  ;(await cookies()).delete('treino-token')
}

export async function loggedUser() {
  const token = (await cookies()).get('treino-token')?.value

  if (!token) return null

  const idProfessor = decrypt(token)

  return await getProfessor(idProfessor)
}

export async function getCurrentAlunos() {
  const professor = await loggedUser()

  if (!professor) return null

  return await getAlunos(professor.id)
}

export async function getCurrentExercicios() {
  const professor = await loggedUser()

  if (!professor) return null

  return await getExercicios(professor.id)
}

export async function getCurrentTreinos() {
  const professor = await loggedUser()

  if (!professor) return null

  return await getTreinosFromProfessor(professor.id)
}

export async function auth() {
  const token = (await cookies()).get('treino-token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile(token)

    return user
  } catch (err) {
    console.log(err)
    redirect('/api/auth/sign-out')
  }
}
