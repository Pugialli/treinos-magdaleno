import { prisma } from '@/lib/prisma'

export interface UpdateExerciciosProps {
  id: string
  nome: string
  categoria: string
  orientacao: string
  fotos: {
    ordem: number
    avatarUrl: string
  }[]
}

export async function updateExercicio({
  id,
  nome,
  categoria,
  orientacao,
  fotos,
}: UpdateExerciciosProps) {
  const exercicio = await prisma.exercicio.update({
    where: {
      id,
    },
    data: {
      nome,
      categoria,
      orientacao,
    },
  })

  if (!exercicio) return null

  const exercicioFotos = await prisma.foto.findMany({
    where: {
      idExercicio: exercicio.id,
    },
    orderBy: {
      ordem: 'asc',
    },
  })

  if (!exercicioFotos) return null

  fotos.map(async (foto, index) => {
    if (!exercicioFotos[index]) {
      return await prisma.foto.create({
        data: {
          idExercicio: exercicio.id,
          ordem: foto.ordem,
          avatarUrl: foto.avatarUrl,
        },
      })
    } else if (foto.avatarUrl !== exercicioFotos[index].avatarUrl) {
      return await prisma.foto.update({
        data: {
          ordem: foto.ordem,
          avatarUrl: foto.avatarUrl,
        },
        where: {
          id: exercicioFotos[index].id,
        },
      })
    }
  })

  return exercicio
}
