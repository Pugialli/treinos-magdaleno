import { prisma } from '@/lib/prisma'

export interface DuplicateTreinoProps {
  idTreino: string
  idAluno: string
}

export async function duplicateTreino({
  idTreino,
  idAluno,
}: DuplicateTreinoProps) {
  const fetchedTreino = await prisma.treino.findUnique({
    where: {
      id: idTreino,
    },
    include: {
      exercicios: true,
    },
  })

  if (!fetchedTreino) return null

  const duplicatedTreino = await prisma.treino.create({
    data: {
      idAluno,
    },
    select: {
      id: true,
      createdAt: true,
      exercicios: {
        select: {
          id: true,
          carga: true,
          descansoMin: true,
          descansoSeg: true,
          isometriaMin: true,
          isometriaSeg: true,
          ordem: true,
          obs: true,
          repeticoes: true,
          series: true,
          exercicio: {
            select: {
              id: true,
              nome: true,
              categoria: true,
              orientacao: true,
              fotos: {
                select: {
                  id: true,
                  avatarUrl: true,
                },
                orderBy: {
                  ordem: 'asc',
                },
              },
            },
          },
        },
        orderBy: {
          ordem: 'asc',
        },
      },
      aluno: {
        select: {
          id: true,
          nome: true,
          slug: true,
          idProfessor: true,
        },
      },
    },
  })

  await Promise.all(
    fetchedTreino.exercicios.map(async (exercicio) => {
      return await prisma.exercicioTreino.create({
        data: {
          idExercicio: exercicio.idExercicio,
          idTreino: duplicatedTreino.id,
          ordem: exercicio.ordem,
          series: exercicio.series,
          carga: exercicio.carga,
          descansoMin: exercicio.descansoMin,
          descansoSeg: exercicio.descansoSeg,
          isometriaMin: exercicio.isometriaMin,
          isometriaSeg: exercicio.isometriaSeg,
          repeticoes: exercicio.repeticoes,
          obs: exercicio.obs,
        },
      })
    }),
  )

  return duplicatedTreino
}
