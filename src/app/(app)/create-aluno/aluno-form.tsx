'use client'

import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'

import type { GetAlunoResponse } from '@/app/api/alunos/[slug]/get-aluno'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { createAlunoAction, updateAlunoAction } from './actions'

interface AlunoFormProps {
  isUpdating?: boolean
  initialData?: GetAlunoResponse
}

export function AlunoForm({ isUpdating = false, initialData }: AlunoFormProps) {
  const formAction = isUpdating ? updateAlunoAction : createAlunoAction

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao salvar um novo aluno!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <Input
        name="slug"
        id="slug"
        type="hidden"
        defaultValue={initialData?.slug}
      />

      <div className="space-y-1">
        <Label htmlFor="nome">Nome</Label>
        <Input name="nome" id="nome" defaultValue={initialData?.nome} />
        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="objetivo">Objetivo</Label>
        <Input
          name="objetivo"
          id="objetivo"
          defaultValue={initialData?.objetivo}
        />
        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar aluno'
        )}
      </Button>
    </form>
  )
}
