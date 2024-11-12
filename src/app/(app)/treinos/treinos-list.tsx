import { getCurrentTreinos } from '@/auth/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TreinosTablerow } from './treinos-table-row'

export async function TreinosList() {
  const treinos = await getCurrentTreinos()

  return (
    <div className="space-y-2">
      <div className="rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rounded-tl-sm">Criado</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead>Número de exercícios</TableHead>
              <TableHead className="rounded-tr-sm">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treinos && treinos.length > 0 ? (
              treinos.map((treino) => {
                return <TreinosTablerow key={treino.id} treino={treino} />
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
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
  )
}
