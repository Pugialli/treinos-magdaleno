'use client'

import { CircleX, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { DeleteExercicioDialog } from '@/components/delete-exercicio-dialog'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { GetExercicioResponse } from '@/http/get-exercicios'
import { orientacaoToPassos } from '@/utils/orientacao-passos'

interface ExerciciosTableRowProps {
  exercicio: GetExercicioResponse
}

export function ExerciciosTablerow({ exercicio }: ExerciciosTableRowProps) {
  const [open, setOpen] = useState(false)

  const passos = orientacaoToPassos(exercicio.orientacao)

  return (
    <AlertDialog open={open} onOpenChange={setOpen} key={exercicio.id}>
      <TableRow>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2 text-nowrap">
              {exercicio.nome}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-2">
              {exercicio.categoria}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex flex-col">
            <span className="line-clamp-2">
              {passos[0].ordem}. {passos[0].orientacao} [...]
            </span>
          </div>
        </TableCell>
        <TableCell className="py-2.5">
          <div className="flex items-center justify-end gap-2">
            <Button size="icon" variant="outline" asChild>
              <Link href={`/exercicios/${exercicio.id}/edit`}>
                <Pencil className="size-4" />
              </Link>
            </Button>

            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive" className="p-0">
                <CircleX className="size-4" />
              </Button>
            </AlertDialogTrigger>

            {/* <form action={removeMemberAction.bind(null, member.id)}>
                          <Button type="submit" size="sm" variant="destructive">
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form> */}
          </div>
        </TableCell>
      </TableRow>

      <DeleteExercicioDialog
        id={exercicio.id}
        nome={exercicio.nome}
        openFn={setOpen}
      />
    </AlertDialog>
  )
}
