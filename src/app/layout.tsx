import type { Metadata } from 'next'
import './globals.css'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Treinos Magdaleno',
  description: 'Gerador de treinos do professor Gabriel Magdaleno',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} w-[600px] antialiased`}>
        {children}
      </body>
    </html>
  )
}
