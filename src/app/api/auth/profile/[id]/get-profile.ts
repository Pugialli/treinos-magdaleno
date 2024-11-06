import { BadRequestError } from '@/app/api/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export interface ProfileData {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  })

  if (!user) {
    throw new BadRequestError('User not found')
  }

  return { user }
}
