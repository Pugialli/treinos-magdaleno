import { Dumbbell } from 'lucide-react'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import background from '@/assets/background.png'
import logo from '@/assets/logo.svg'
import { SectionWithBackground } from '@/components/SectionWithBackground'
import { Button } from '@/components/ui/button'
import { getAluno } from '@/http/get-aluno'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function Aluno({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const aluno = await getAluno((await params).slug)

  const treinoId = 'c296c6ce-e20e-4bdb-98b0-dcdf1521dca4'
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
            <Link href={`/aluno/${aluno.slug}/treino/${treinoId}`}>
              <Dumbbell className="mr-2 size-4" />
              Ir para o último treino de {aluno.nome}
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/aluno/${aluno.slug}/create-treino`}>
              <Dumbbell className="mr-2 size-4" />
              Criar um novo treino para {aluno.nome}
            </Link>
          </Button>
        </div>
      </SectionWithBackground>
    </main>
  )
}
