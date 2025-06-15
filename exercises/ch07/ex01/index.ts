export type Matrix = number[][];

function isValidMatrixShape(matrix: Matrix): boolean {
  if (matrix.length === 0) return false;
  return matrix.every((row) => row.length === matrix[0].length);
}

export function addMatrices(A: Matrix, B: Matrix): Matrix {
  if (
    !isValidMatrixShape(A) ||
    !isValidMatrixShape(B) ||
    A.length !== B.length ||
    A[0].length !== B[0].length
  ) {
    throw new Error("行列のサイズが一致していません。");
  }

  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

export function multiplyMatrices(A: Matrix, B: Matrix): Matrix {
  if (
    !isValidMatrixShape(A) ||
    !isValidMatrixShape(B) ||
    A[0].length !== B.length
  ) {
    throw new Error("Aの列数とBの行数が一致していません。");
  }

  const result: Matrix = Array.from({ length: A.length }, () =>
    Array(B[0].length).fill(0)
  );

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return result;
}
