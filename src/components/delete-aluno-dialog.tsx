import { type Dispatch, type SetStateAction, useState } from 'react'

import { deleteAluno } from '@/http/delete-aluno'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface DeleteProps {
  slug: string
  nome: string
  openFn: Dispatch<SetStateAction<boolean>>
}

export function DeleteAlunoDialog({ slug, nome, openFn }: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    await deleteAluno(slug).then(() => {
      setIsDeleting(false)
    })
  }

  return (
    <AlertDialogContent className="w-80">
      <AlertDialogHeader className="flex flex-col gap-2">
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-4">
          <span>
            Tem certeza que deseja deletar o aluno{' '}
            <span className="font-bold">{nome}</span>?
          </span>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="disabled:cursor-wait disabled:opacity-50"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className="disabled:cursor-wait disabled:opacity-50"
            onClick={(event) => {
              handleDelete().then(() => openFn(false))
              event.preventDefault()
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}
