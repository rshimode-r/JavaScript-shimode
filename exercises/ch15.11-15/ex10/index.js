const worker = new Worker("worker.js");

const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");

document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (e) => (img.src = e.target.result);

  img.onload = () => {
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // Workerへ
    worker.postMessage(
      {
        data: imageData.data,
        width: img.width,
        height: img.height,
      },
      [imageData.data.buffer]
    );
  };

  reader.readAsDataURL(file);
});

// Worker から結果を受信
worker.onmessage = (e) => {
  const { outputData, width, height } = e.data;
  const outputImageData = new ImageData(outputData, width, height);
  filteredCtx.putImageData(outputImageData, 0, 0);
};

//スムーズに動き続ける。
const box = document.getElementById("box");
let x = 0;

function animate() {
  x = (x + 2) % 300;
  box.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}

animate();
