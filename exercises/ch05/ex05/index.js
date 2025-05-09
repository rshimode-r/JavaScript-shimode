export function OmitOddNumberOfObject(o) {
  let returnObject = {};
  for (let [k, v] of Object.entries(o)) if (v % 2 == 0) returnObject[k] = v;
  return returnObject;
}
