self.onmessage = (message) => {
  const { tile, canvasWidth, canvasHeight, maxDepth } = message.data;
  const { width, height, x, y } = tile;

  const imageData = new ImageData(width, height);
  const buf = new Uint32Array(imageData.data.buffer);

  const side = Math.min(canvasWidth, (canvasHeight * 2) / Math.sqrt(3));
  const h = (Math.sqrt(3) / 2) * side;

  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2;

  const A = { x: cx, y: cy - h / 2 };
  const B = { x: cx - side / 2, y: cy + h / 2 };
  const C = { x: cx + side / 2, y: cy + h / 2 };

  function inside(ax, ay, bx, by, cx, cy, px, py) {
    const s = (ax - cx) * (py - cy) - (ay - cy) * (px - cx);
    const t = (bx - ax) * (py - ay) - (by - ay) * (px - ax);
    const u = (cx - bx) * (py - by) - (cy - by) * (px - bx);
    return (s >= 0 && t >= 0 && u >= 0) || (s <= 0 && t <= 0 && u <= 0);
  }

  function sierpinski(px, py) {
    let a = A,
      b = B,
      c = C;

    for (let i = 0; i < maxDepth; i++) {
      const ab = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const bc = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
      const ca = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };

      if (inside(ab.x, ab.y, bc.x, bc.y, ca.x, ca.y, px, py)) return false;

      if (inside(a.x, a.y, ab.x, ab.y, ca.x, ca.y, px, py)) (c = ca), (b = ab);
      else if (inside(ab.x, ab.y, b.x, b.y, bc.x, bc.y, px, py))
        (a = ab), (c = bc);
      else if (inside(ca.x, ca.y, bc.x, bc.y, c.x, c.y, px, py))
        (a = ca), (b = bc);
      else return false;
    }
    return true;
  }

  let i = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const px = x + col;
      const py = y + row;

      buf[i++] = sierpinski(px, py) ? 0xff000000 : 0xffffffff;
    }
  }

  postMessage({ tile, imageData });
};
