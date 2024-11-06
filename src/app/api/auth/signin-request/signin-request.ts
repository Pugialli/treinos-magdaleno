import { compare } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { encrypt } from '@/utils/crypto'

import { BadRequestError } from '../../_errors/bad-request-error'

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
    throw new BadRequestError('Invalid credentials.')
  }

  // if (!userExists) {
  //   return NextResponse.json('', { status: 404, statusText: 'User not found' })
  // }

  const isPasswordValid = userExists.passwordHash
    ? await compare(password, userExists.passwordHash)
    : false

  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials.')
  }

  // if (!passwordCorrect) {
  //   return NextResponse.json('', {
  //     status: 401,
  //     statusText: 'User or password incorrect',
  //   })
  // }

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
