import { Dumbbell } from 'lucide-react'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import background from '@/assets/background.png'
import logo from '@/assets/logo.svg'
import { SectionWithBackground } from '@/components/SectionWithBackground'
import { Button } from '@/components/ui/button'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
export default function Home() {
  const treinoId = 'c1f5d8d0-514e-4f68-8c6c-103631f1ec76'
  return (
    <main>
      <SectionWithBackground imageSrc={background}>
        <div className="absolute flex flex-col items-center gap-5 px-28 py-48">
          <Image src={logo} width={90} height={90} alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">
              Gabriel Magdaleno
            </h1>
            <h2
              className={`${roboto.className} text-2xl text-muted-foreground`}
            >
              Fisioterapeuta & Educador Físico
            </h2>
          </div>
          <Button size="sm" asChild>
            <Link href={`/treino/${treinoId}`}>
              <Dumbbell className="mr-2 size-4" />
              Ir para o treino
            </Link>
          </Button>
        </div>
      </SectionWithBackground>
    </main>
  )
}
