import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino'

export function groupByOrder(
  exercicios: ExercicioFromTreino[],
): ExercicioFromTreino[][] {
  const grouped: ExercicioFromTreino[][] = []

  exercicios.forEach((exercicio) => {
    const principalIndex = Math.floor(exercicio.ordem) - 1 // Índice do grupo principal

    if (!grouped[principalIndex]) {
      grouped[principalIndex] = [] // Inicializa o grupo principal, se necessário
    }

    grouped[principalIndex].push(exercicio) // Adiciona ao final do grupo
  })

  return grouped
}

// Reverte ExercicioFromTreino[i][j] para ExercicioFromTreino[]
export function flattenGrouped(
  groupedExercicios: ExercicioFromTreino[][],
): ExercicioFromTreino[] {
  return groupedExercicios
    .flatMap((group, i) =>
      group.map((exercicio, j) => ({
        ...exercicio,
        ordem: i + 1 + (j + 1) / 10, // Recalcula a ordem sequencial
      })),
    )
    .sort((a, b) => a.ordem - b.ordem)
}
