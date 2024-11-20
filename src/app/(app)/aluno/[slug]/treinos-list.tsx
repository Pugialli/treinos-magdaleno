'use client'

import 'dayjs/locale/pt-br'

import { AlertTriangle, BadgeCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import type { GetTreinoResponse } from '@/app/api/treinos/[id]/get-treino'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TreinoTableRow } from './treino-table-row'

interface TreinosListProps {
  treinos: GetTreinoResponse[]
}

export function TreinosList({ treinos }: TreinosListProps) {
  const searchParams = useSearchParams()

  const response = searchParams.get('status')

  return (
    <>
      {response === 'error' && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao duplicar um novo treino!</AlertTitle>
          <AlertDescription>
            <p>Erro inesperado, tente novamente em alguns minutos</p>
          </AlertDescription>
        </Alert>
      )}

      {response === 'success' && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>Treino duplicado com sucesso</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <div className="rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-sm">Criado</TableHead>
                <TableHead>Número de exercícios</TableHead>
                <TableHead className="rounded-tr-sm">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treinos.length > 0 ? (
                treinos.map((treino) => {
                  return <TreinoTableRow key={treino.id} treino={treino} />
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    Sem treinos cadastrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
