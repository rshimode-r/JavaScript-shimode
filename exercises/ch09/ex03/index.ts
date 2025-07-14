export function PositiveNumber(x: number) {
  if (isNaN(x) || x <= 0) {
    throw new Error("require : x > 0");
  }
  return {
    getX(): number {
      return x;
    },
    setX(newX: number) {
      if (isNaN(newX) || newX <= 0) {
        throw new Error("require : x > 0");
      }
      x = newX;
    },
  };
}
