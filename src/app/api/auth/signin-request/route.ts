import type { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { signInRequest } from './signin-request'

interface LoginProps {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export async function POST(request: NextRequest) {
  const credendials: LoginProps = await request.json()

  const userToken = await signInRequest(credendials)

  return NextResponse.json(userToken, { status: 200 })
}
