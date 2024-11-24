'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { GetAlunosWithTreinoResponse } from '@/app/api/professor/[id]/alunos/get-alunos'

import { DeleteAlunoDialog } from './delete-aluno-dialog'
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

interface SheetActionsAlunoProps {
  aluno: GetAlunosWithTreinoResponse
}

export function SheetActionsAluno({ aluno }: SheetActionsAlunoProps) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <SheetContent side="bottom" className="rounded-lg">
      <AlertDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        key={aluno.id}
      >
        <SheetHeader>
          <SheetDescription className="text-center text-base font-normal">
            ALUNO (A)
          </SheetDescription>
          <SheetTitle className="text-center text-2xl font-bold">
            {aluno.nome}
          </SheetTitle>
        </SheetHeader>

        <div className="grid gap-6 px-8 py-10">
          <Button asChild size="lg">
            <Link href={`/create-treino?aluno=${aluno.slug}`}>Novo treino</Link>
          </Button>
          <Button asChild variant="tertiary" size="lg">
            <Link href={`/aluno/${aluno.slug}`}>Ver treinos antigos</Link>
          </Button>
          <Button asChild variant="tertiary" size="lg">
            <Link href={`/aluno/${aluno.slug}/edit`}>Editar aluno(a)</Link>
          </Button>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="destructive">
              Deletar aluno(a)
            </Button>
          </AlertDialogTrigger>
        </div>
        <DeleteAlunoDialog
          slug={aluno.slug}
          nome={aluno.nome}
          openFn={setOpenDialog}
        />
      </AlertDialog>
    </SheetContent>
  )
}
