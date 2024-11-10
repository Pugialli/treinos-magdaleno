import { compare } from 'bcryptjs'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { encrypt } from '@/utils/crypto'

interface LoginProps {
  email: string
  password: string
}

interface UserResponse {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export async function signInRequest({ email, password }: LoginProps) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  const isPasswordValid = userExists.passwordHash
    ? await compare(password, userExists.passwordHash)
    : false

  if (!isPasswordValid) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  const user: UserResponse = {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
    avatarUrl: userExists.avatarUrl || undefined,
  }

  const idCrypted = encrypt(userExists.id)

  return {
    user,
    token: idCrypted,
  }
}
