'use server'

import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'
import { SheetSidebar } from '@/components/sheet-sidebar'
import { Sheet } from '@/components/ui/sheet'

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
      <Sheet>
        {children}
        <SheetSidebar />
      </Sheet>
      {sheet}
    </div>
  )
}
