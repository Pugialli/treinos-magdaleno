import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfessor } from '@/http/get-professor'
import { getProfile } from '@/http/get-profile'
import { decrypt } from '@/utils/crypto'

export async function isAuthenticated() {
  return !!(await cookies()).get('treino-token')?.value
}

export async function logUserOut() {
  return (await cookies()).delete('treino-token')
}

export async function loggedUser() {
  const token = (await cookies()).get('treino-token')?.value

  if (!token) return null

  const idProfessor = decrypt(token)

  return await getProfessor(idProfessor)
}
export async function auth() {
  const token = (await cookies()).get('treino-token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile(token)

    return user
  } catch {}
  redirect('/api/auth/sign-out')
}
