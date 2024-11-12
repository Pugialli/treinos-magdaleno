import { getCurrentExercicios } from '@/auth/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ExerciciosTablerow } from './exercicios-table-row'

export async function ExerciciosList() {
  const exercicios = await getCurrentExercicios()

  return (
    <div className="space-y-2">
      <div className="rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rounded-tl-sm">Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Orientações</TableHead>
              <TableHead className="rounded-tr-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercicios && exercicios.length > 0 ? (
              exercicios.map((exercicio) => {
                return (
                  <ExerciciosTablerow
                    key={exercicio.id}
                    exercicio={exercicio}
                  />
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  Sem exercícios cadastrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
