import { NextResponse } from 'next/server'

import { getProfile } from './get-profile'

export async function GET() {
  const profile = await getProfile()

  return NextResponse.json(profile.user)
}
