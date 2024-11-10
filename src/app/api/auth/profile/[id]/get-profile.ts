import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export interface ProfileData {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

interface GetProfileProps {
  id: string
}

export async function getProfile({ id }: GetProfileProps) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  })

  if (!user) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  return { user }
}
