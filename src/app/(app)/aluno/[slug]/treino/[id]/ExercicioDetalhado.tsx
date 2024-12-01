import {
  ChevronsRight,
  CircleAlert,
  Clock4,
  Dumbbell,
  RefreshCcw,
} from 'lucide-react'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { orientacaoToPassos } from '@/utils/orientacao-passos'
import { timeToString } from '@/utils/time-to-string'

export interface ExercicioDetalhadoProps {
  exercicio: ExercicioFromTreino
}

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

export function ExercicioDetalhado({ exercicio }: ExercicioDetalhadoProps) {
  const passos = orientacaoToPassos(exercicio.exercicio.orientacao)

  const isometria = timeToString({
    min: exercicio.isometriaMin,
    sec: exercicio.isometriaSeg,
  })

  const descanso = timeToString({
    min: exercicio.descansoMin,
    sec: exercicio.descansoSeg,
  })

  const colSpanCarga = isometria !== '0s' ? 'col-span-1' : 'col-span-2'
  const colSpanIsometria = exercicio.carga ? 'col-span-1' : 'col-span-2'
  const colSpanSerie = exercicio.repeticoes ? 'col-span-1' : 'col-span-2'

  return (
    <div className="space-y-9">
      <span className="text-2xl font-bold uppercase text-primary">
        {exercicio.exercicio.nome}
      </span>
      <div className="grid grid-cols-2 gap-2">
        {exercicio.carga !== 0 && (
          <Card
            className={cn(
              colSpanCarga,
              `flex w-full items-center justify-center border-0 bg-primary/10 py-2 text-foreground`,
            )}
          >
            <Dumbbell className="mr-2 size-4" />
            <p className="text-lg">
              Carga: <span className="font-bold">{exercicio.carga} kgs</span>
            </p>
          </Card>
        )}
        {isometria !== '0s' && (
          <Card
            className={cn(
              colSpanIsometria,
              `flex w-full items-center justify-center border-0 bg-primary/10 py-2 text-foreground`,
            )}
          >
            <Clock4 className="mr-2 size-4" />
            <p className="text-lg">
              Isometria: <span className="font-bold">{isometria}</span>
            </p>
          </Card>
        )}
        {exercicio.repeticoes && (
          <Card className="col-span-1 flex w-full items-center justify-center border-0 bg-primary/10 py-2 text-foreground">
            <RefreshCcw className="mr-2 size-4" />
            <p className="text-lg">
              Repetições:{' '}
              <span className="font-bold">{exercicio.repeticoes}</span>
            </p>
          </Card>
        )}
        <Card
          className={cn(
            colSpanSerie,
            `flex w-full items-center justify-center border-0 bg-primary/10 py-2 text-foreground`,
          )}
        >
          <ChevronsRight className="mr-2 size-4" />
          <p className="text-lg">
            Séries: <span className="font-bold">{exercicio.series}</span>
          </p>
        </Card>
        {exercicio.obs && (
          <span
            className={`${roboto.className} col-span-2 text-sm font-light text-foreground`}
          >
            * {exercicio.obs}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <span className="text-lg font-semibold text-primary">ORIENTAÇÕES:</span>
        <div className="flex flex-col gap-2">
          {passos.map((passo) => {
            return (
              <div
                className="flex gap-4 pb-2 text-foreground"
                key={passo.orientacao}
              >
                <p>{passo.ordem}.</p>
                <p>{passo.orientacao}</p>
              </div>
            )
          })}
        </div>
      </div>
      {descanso !== '0s' && (
        <Card className="col-span-1 flex w-full items-center justify-center border-0 bg-primary/10 py-2 text-foreground">
          <CircleAlert className="mr-2 size-4" />
          <p className="text-lg">
            Descanse <span className="font-bold">{descanso}</span> entre as
            séries.
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
