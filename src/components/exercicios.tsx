import backgroundExercicio from '@/assets/background_exercicio.png'
import { Roboto } from 'next/font/google'
import { SectionWithBackground } from './SectionWithBackground'
import { Separator } from './ui/separator'

const roboto = Roboto({
  weight: ['100'],
  subsets: ['latin'],
  display: 'swap',
})

export function Exercicios() {
  return (
    <SectionWithBackground imageSrc={backgroundExercicio}>
      <div className="flex flex-col gap-11 px-9 py-16 text-center">
        <h1 className="text-2xl font-light text-primary">
          ORDEM DOS EXERCÍCIOS
        </h1>
        <Separator className="bg-primary" />
        <div
          className={`${roboto.className} flex flex-col gap-8 text-left text-xl`}
        >
          <div className="flex flex-col gap-2 uppercase">
            <div className="flex gap-4">
              <p>1.</p>
              <p> Conjugado 1</p>
            </div>
            <div className="flex flex-col gap-2 indent-11">
              <p>Puxada barra reta Pronada</p>
              <p>Puxada barra reta supinada</p>
            </div>
          </div>
          <Separator className="bg-primary" />
          <div className="uppercase">
            <div className="flex gap-4">
              <p>2.</p>
              <p> Exercício 2</p>
            </div>
          </div>
          <Separator className="bg-primary" />
          <div className="uppercase">
            <div className="flex gap-4">
              <p>3.</p>
              <p> Exercício 3</p>
            </div>
          </div>
          <Separator className="bg-primary" />
          <div className="uppercase">
            <div className="flex gap-4">
              <p>4.</p>
              <p> Exercício 4</p>
            </div>
          </div>
          <Separator className="bg-primary" />
        </div>
      </div>
    </SectionWithBackground>
  )
}
