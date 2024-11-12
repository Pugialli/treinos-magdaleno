import { prisma } from '@/lib/prisma'

interface GetAlunosProps {
  idProfessor: string
}

export async function getAlunos({ idProfessor }: GetAlunosProps) {
  return await prisma.aluno.findMany({
    where: {
      idProfessor,
    },
    include: {
      treinos: {
        select: {
          id: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      nome: 'asc',
    },
  })
}
