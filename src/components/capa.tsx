import background from '@/assets/background.png'
import logo from '@/assets/logo.svg'
import { Separator } from '@/components/ui/separator'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import { SectionWithBackground } from './SectionWithBackground'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export function Capa() {
  return (
    <div>
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
        </div>
      </SectionWithBackground>
      <div className="flex flex-col gap-11 px-9 py-11 text-center">
        <span className="text-2xl font-light text-primary">
          TREINO INDIVIDUALIZADO
        </span>
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-light">Nome do Aluno(a):</span>
          <span className="font-semibold">Amanda Porto Padilha</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-light">Objetivo</span>
          <span>ficar monstrão</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-light">
              Início do acompanhamento:
            </span>
            <span>31/02/2024</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-light">Data da série atual:</span>
            <span>06/06/2024</span>
          </div>
        </div>
      </div>
    </div>
  )
}
