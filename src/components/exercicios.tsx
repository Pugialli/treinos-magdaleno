import { Roboto } from 'next/font/google'

import backgroundExercicio from '@/assets/background_exercicio.png'
import { type Exercicio, getTreino } from '@/http/get-treino'

import { SectionWithBackground } from './SectionWithBackground'
import { Separator } from './ui/separator'

const roboto = Roboto({
  weight: ['100'],
  subsets: ['latin'],
  display: 'swap',
})

function agruparPorOrdem(exercicios: Exercicio[]) {
  const agrupados: Exercicio[][] = []

  exercicios.forEach((exercicio) => {
    const parteInteira = Math.floor(exercicio.ordem)
    const parteDecimal = exercicio.ordem % 1

    // Calcula a nova ordem: mantém a parte inteira ou multiplica a parte decimal por 10
    const novaOrdem =
      parteDecimal === 0 ? parteInteira : Math.round(parteDecimal * 10)

    // Verifica se já existe um grupo com a mesma parte inteira da ordem
    let grupo = agrupados.find((g) => Math.floor(g[0].ordem) === parteInteira)

    // Se não existe, cria um novo grupo
    if (!grupo) {
      grupo = []
      agrupados.push(grupo)
    }

    // Adiciona o exercício ao grupo, ajustando a ordem conforme necessário
    grupo.push({
      ...exercicio,
      ordem: novaOrdem,
    })
  })

  return agrupados
}

export interface ExerciciosProps {
  treinoId: string
}

export async function Exercicios({ treinoId }: ExerciciosProps) {
  const treino = await getTreino(treinoId)

  const exercicios = agruparPorOrdem(treino.exercicios)

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
