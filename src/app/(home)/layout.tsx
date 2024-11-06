'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
