import { Roboto } from 'next/font/google'

import backgroundExercicio from '@/assets/background_exercicio.png'
import { SectionWithBackground } from '@/components/SectionWithBackground'
import { Separator } from '@/components/ui/separator'
import { type Exercicio } from '@/http/get-treino'

const roboto = Roboto({
  weight: ['100'],
  subsets: ['latin'],
  display: 'swap',
})

interface OrdemExerciciosProps {
  exercicios: Exercicio[][]
}

export async function OrdemExercicios({ exercicios }: OrdemExerciciosProps) {
  return (
    <SectionWithBackground imageSrc={backgroundExercicio}>
      <div className="flex flex-col gap-8 px-9 py-16 text-center">
        <h1 className="text-2xl font-light text-primary">
          ORDEM DOS EXERCÍCIOS
        </h1>
        <Separator className="bg-primary" />
        <div
          className={`${roboto.className} flex flex-col gap-6 text-left text-xl uppercase`}
        >
          {exercicios.map((exercicio) => {
            if (exercicio.length > 1) {
              return (
                <div key={exercicio[0].id} className="flex flex-col gap-6">
                  <div>
                    <div className="flex gap-4 pb-2">
                      <p>{exercicio[0].ordem}.</p>
                      <p>Conjugado</p>
                    </div>
                    <div className="flex flex-col gap-2 indent-11">
                      {exercicio.map((conjugado) => {
                        return (
                          <p key={conjugado.id}>{conjugado.exercicio.nome}</p>
                        )
                      })}
                    </div>
                  </div>
                  <Separator className="bg-primary" />
                </div>
              )
            } else {
              return (
                <div key={exercicio[0].id} className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <p>{exercicio[0].ordem}.</p>
                    <p>{exercicio[0].exercicio.nome}</p>
                  </div>
                  <Separator className="bg-primary" />
                </div>
              )
            }
          })}
        </div>
      </div>
    </SectionWithBackground>
  )
}
