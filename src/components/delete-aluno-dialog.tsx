import { type Dispatch, type SetStateAction, useState } from 'react'

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
  id: string
  nome: string
  openFn: Dispatch<SetStateAction<boolean>>
}

export async function deleteAluno(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000))

  console.log(`deletar ${id}`)

  // return await api.patch(`encontrista/${encontristaId}/delete`)
}

export function DeleteAlunoDialog({ id, nome, openFn }: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    await deleteAluno(id).then(() => {
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
