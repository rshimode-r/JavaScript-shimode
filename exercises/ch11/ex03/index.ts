export function toBigEndian(data: Uint32Array): Uint32Array {
  const buffer = new ArrayBuffer(data.byteLength);
  const view = new DataView(buffer);

  for (let i = 0; i < data.length; i++) {
    view.setUint32(i * 4, data[i], false); // false はビッグエンディアン
  }
  return new Uint32Array(buffer);
}

export function toLittleEndian(data: Uint32Array): Uint32Array {
  const buffer = new ArrayBuffer(data.byteLength);
  const view = new DataView(buffer);

  for (let i = 0; i < data.length; i++) {
    view.setUint32(i * 4, data[i], true); // true はリトルエンディアン
  }
  return new Uint32Array(buffer);
}
