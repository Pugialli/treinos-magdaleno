import {
  ChevronsRight,
  CircleAlert,
  Clock4,
  Dumbbell,
  RefreshCcw,
} from 'lucide-react'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

import { Card } from '@/components/ui/card'
import type { Exercicio } from '@/http/get-treino'
import { cn } from '@/lib/utils'

export interface ExercicioDetalhadoProps {
  exercicio: Exercicio
}

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

export function ExercicioDetalhado({ exercicio }: ExercicioDetalhadoProps) {
  const passos = [
    ...exercicio.exercicio.orientacao.matchAll(/(\d+)\.([\s\S]+?)(?=\d+\.|$)/g),
  ].map((match) => ({
    ordem: Number(match[1]),
    orientacao: match[2].trim(),
  }))

  const colSpanCarga = exercicio.isometria ? 'col-span-1' : 'col-span-2'
  const colSpanIsometria = exercicio.carga ? 'col-span-1' : 'col-span-2'

  return (
    <div className="space-y-9">
      <span className="text-2xl font-bold uppercase text-primary">
        {exercicio.exercicio.nome}
      </span>
      <div className="grid grid-cols-2 gap-2">
        {exercicio.carga && (
          <Card
            className={cn(
              colSpanCarga,
              `flex w-full items-center justify-center border-0 bg-primary/10 py-2`,
            )}
          >
            <Dumbbell className="mr-2 size-4" />
            <p className="text-lg">
              Carga: <span className="font-bold">{exercicio.carga}</span>
            </p>
          </Card>
        )}
        {exercicio.isometria && (
          <Card
            className={cn(
              colSpanIsometria,
              `flex w-full items-center justify-center border-0 bg-primary/10 py-2`,
            )}
          >
            <Clock4 className="mr-2 size-4" />
            <p className="text-lg">
              Isometria:{' '}
              <span className="font-bold">{exercicio.isometria}</span>
            </p>
          </Card>
        )}
        <Card className="col-span-1 flex w-full items-center justify-center border-0 bg-primary/10 py-2">
          <RefreshCcw className="mr-2 size-4" />
          <p className="text-lg">
            Repetições:{' '}
            <span className="font-bold">{exercicio.repeticoes}</span>
          </p>
        </Card>
        <Card className="col-span-1 flex w-full items-center justify-center border-0 bg-primary/10 py-2">
          <ChevronsRight className="mr-2 size-4" />
          <p className="text-lg">
            Séries: <span className="font-bold">{exercicio.series}</span>
          </p>
        </Card>
        {exercicio.obs && (
          <span className={`${roboto.className} col-span-2 text-sm font-light`}>
            * {exercicio.obs}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <span className="text-lg font-semibold text-primary">ORIENTAÇÕES:</span>
        <div className="flex flex-col gap-2">
          {passos.map((passo) => {
            return (
              <div className="flex gap-4 pb-2" key={passo.orientacao}>
                <p>{passo.ordem}.</p>
                <p>{passo.orientacao}</p>
              </div>
            )
          })}
        </div>
      </div>
      {exercicio.descanso && (
        <Card className="col-span-1 flex w-full items-center justify-center border-0 bg-primary/10 py-2">
          <CircleAlert className="mr-2 size-4" />
          <p className="text-lg">
            Descanse <span className="font-bold">{exercicio.descanso}</span>{' '}
            entre as séries.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-2">
        {exercicio.exercicio.fotos.length > 0 &&
          exercicio.exercicio.fotos.map((foto) => {
            return (
              <Card
                className="relative col-span-1 flex h-64 w-full shrink-0 items-center justify-center overflow-hidden border-0 bg-primary/10 py-2"
                key={foto.id}
              >
                <Image
                  src={foto.avatarUrl}
                  alt=""
                  layout="fill"
                  priority={false}
                />
              </Card>
            )
          })}
      </div>
    </div>
  )
}
