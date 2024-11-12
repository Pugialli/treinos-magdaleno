import dayjs from 'dayjs'
import { type Dispatch, type SetStateAction, useState } from 'react'

import { deleteTreino } from '@/http/delete-treino'

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
  createdDate: Date
  openFn: Dispatch<SetStateAction<boolean>>
}

export function DeleteTreinoDialog({
  id,
  nome,
  createdDate,
  openFn,
}: DeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const dataTreino = dayjs(createdDate).format('DD/MM/YY')

  async function handleDelete() {
    setIsDeleting(true)
    await deleteTreino(id).then(() => {
      setIsDeleting(false)
    })
  }

  return (
    <AlertDialogContent className="w-80">
      <AlertDialogHeader className="flex flex-col gap-2">
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-4">
          <span>
            Tem certeza que deseja deletar o treino de{' '}
            <span className="font-bold">{nome}</span> do dia{' '}
            <span className="font-bold">{dataTreino}</span>?
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
