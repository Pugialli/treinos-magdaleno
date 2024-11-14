import { prisma } from '@/lib/prisma'

export interface TransferTreinoProps {
  idTreino: string
  idAluno: string
}

export async function transferTreino({
  idTreino,
  idAluno,
}: TransferTreinoProps) {
  return await prisma.treino.update({
    data: {
      idAluno,
    },
    where: {
      id: idTreino,
    },
  })
}
