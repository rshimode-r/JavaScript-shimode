document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // imageData の中身はそのままに別の配列に結果を格納するとよい
    const outputData = new Uint8ClampedArray(data.length);

    const width = img.width;
    const height = img.height;

    //(参考)
    // https://www.mitani-visual.jp/mivlog/imageprocessing/gf3r89.php
    // https://note.com/omakazu/n/n877890edb256
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSize = 5;
    const kernelHalf = Math.floor(kernelSize / 2); //2
    const kernelSum = kernel.flat().reduce((a, b) => a + b, 0); //256

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = -kernelHalf; ky <= kernelHalf; ky++) {
          for (let kx = -kernelHalf; kx <= kernelHalf; kx++) {
            //はみ出したら、端で固定
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            const i = (py * width + px) * 4; //1ピクセル4バイト
            const w = kernel[ky + kernelHalf][kx + kernelHalf];

            r += data[i] * w;
            g += data[i + 1] * w;
            b += data[i + 2] * w;
          }
        }

        const idx = (y * width + x) * 4;
        outputData[idx] = r / kernelSum;
        outputData[idx + 1] = g / kernelSum;
        outputData[idx + 2] = b / kernelSum;
        // 不透明
        outputData[idx + 3] = 255;
      }
    }

    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
