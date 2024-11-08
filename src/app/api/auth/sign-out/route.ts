import { type NextRequest, NextResponse } from 'next/server'

import { logUserOut } from '@/auth/auth'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'
  redirectUrl.search = ''

  await logUserOut()

  return NextResponse.redirect(redirectUrl)
}
