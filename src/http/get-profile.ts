import { decrypt } from '@/utils/crypto'

import { api } from './api-client'

interface GetProfileResponse {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
}

export async function getProfile(token: string) {
  const idProfile = decrypt(token)

  const result = await api
    .get(`auth/profile/${idProfile}`)
    .json<GetProfileResponse>()

  return result
}
