export function restrict(
  target: Record<string | symbol, any>,
  template: Record<string | symbol, any>
): Record<string | symbol, any> {
  for (const key of Object.getOwnPropertyNames(target)) {
    if (!template.hasOwnProperty(key)) {
      delete target[key];
    }
  }
  return target;
}

export function substract(
  target: Record<string | symbol, any>,
  ...sources: Record<string | symbol, any>[]
) {
  for (const source of sources) {
    for (const key of Object.getOwnPropertyNames(source)) {
      if (target.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }
  return target;
}
