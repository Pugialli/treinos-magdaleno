import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

// export interface GetAlunosResponse {
//   id: string
//   idProfessor: string
//   slug: string
//   nome: string
//   objetivo: string
//   createdAt: string
// }

export async function getExercicios({ idProfessor }: GetAlunosProps) {
  return await prisma.exercicio.findMany({
    where: {
      idProfessor,
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
