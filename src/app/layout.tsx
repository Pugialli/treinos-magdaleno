import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { Providers } from './providers'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.className} w-[600px] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
