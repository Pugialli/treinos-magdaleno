import { Separator } from '@/components/ui/separator'
import { type Exercicio, getTreino } from '@/http/get-treino'

import { ConjugadoDetalhado } from './ConjugadoDetalhado'
import { ExercicioDetalhado } from './ExercicioDetalhado'
import { OrdemExercicios } from './OrdemExercicios'

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

interface ExerciciosProps {
  treinoId: string
}

export async function Exercicios({ treinoId }: ExerciciosProps) {
  const treino = await getTreino(treinoId)

  const exercicios = agruparPorOrdem(treino.exercicios)

  return (
    <div>
      <OrdemExercicios exercicios={exercicios} />
      <Separator className="bg-black" />
      {exercicios.map((exercicio) => {
        if (exercicio.length > 1) {
          return (
            <div
              className="bg-gradient-to-b from-background to-accent px-4 py-12"
              key={exercicio[0].id}
            >
              <ConjugadoDetalhado exercicios={exercicio} />
            </div>
          )
        } else {
          return (
            <div
              className="bg-gradient-to-b from-background to-accent px-9 py-16"
              key={exercicio[0].id}
            >
              <ExercicioDetalhado exercicio={exercicio[0]} />
            </div>
          )
        }
      })}
    </div>
  )
}
