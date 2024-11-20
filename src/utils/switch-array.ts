// eslint-disable-next-line prettier/prettier
import type { ExercicioFromTreino } from '@/app/api/treinos/[id]/get-treino';

export function swapConjugado(
  matrix: ExercicioFromTreino[][],
  row1: number,
  row2: number,
): ExercicioFromTreino[][] {
  if (row1 >= matrix.length || row2 >= matrix.length) {
    return matrix
  }
  const newMatrix = [...matrix]
  ;[newMatrix[row1], newMatrix[row2]] = [newMatrix[row2], newMatrix[row1]]
  return newMatrix
}

export function swapExercicioInConjugado(
  matrix: ExercicioFromTreino[][],
  col1: number,
  col2: number,
  row: number,
): ExercicioFromTreino[][] {
  if (
    row >= matrix.length ||
    col1 >= matrix[row].length ||
    col2 >= matrix[row].length
  ) {
    return matrix
  }
  const newMatrix = matrix.map((row) => [...row]) // Criar uma cópia profunda
  ;[newMatrix[row][col1], newMatrix[row][col2]] = [
    newMatrix[row][col2],
    newMatrix[row][col1],
  ]
  return newMatrix
}
