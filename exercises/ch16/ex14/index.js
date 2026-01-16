import sharp from "sharp";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

if (isMainThread) {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error("Usage: index.js <input> <output>");
    process.exit(1);
  }

  try {
    //alphaを必ず持つ生データ→RGBA
    // https://sharp.pixelplumbing.com/api-channel/#ensurealpha
    const image = sharp(inputPath).ensureAlpha().raw();
    // { resolveWithObject: true }でinfoも取れる
    const { data, info } = await image.toBuffer({ resolveWithObject: true });
    const width_ = info.width;
    const height_ = info.height;
    // https://nodejs.org/api/worker_threads.html#worker_threadsworkerdata
    const worker = new Worker(new URL(import.meta.url), {
      workerData: { data, width: width_, height: height_ },
    });

    worker.on("message", async (outputBuffer) => {
      const outputData = new Uint8ClampedArray(outputBuffer);
      //R,G,B,Aから画像データを生成
      await sharp(Buffer.from(outputData), {
        raw: { width: width_, height: height_, channels: 4 },
      }).toFile(outputPath);

      console.log(`Gaussian filter applied, saved as ${outputPath}`);
    });

    worker.on("error", console.error);
    worker.on("exit", (code) => {
      if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
    });
  } catch (err) {
    console.error(err);
  }
} else {
  const width = workerData.width;
  const height = workerData.height;
  const data = new Uint8ClampedArray(workerData.data);
  const outputData = new Uint8ClampedArray(data.length);

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

  parentPort.postMessage(outputData.buffer, [outputData.buffer]);
}
