'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

interface AdminLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

export default async function AdminLayout({
  children,
  sheet,
}: AdminLayoutProps) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      {children}
      {sheet}
    </div>
  )
}
