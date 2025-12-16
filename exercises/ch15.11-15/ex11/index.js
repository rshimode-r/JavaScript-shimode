class Tile {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  static *tiles(width, height, numRows, numCols) {
    const columnWidth = Math.ceil(width / numCols);
    const rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      const tileHeight =
        row < numRows - 1 ? rowHeight : height - rowHeight * (numRows - 1);
      for (let col = 0; col < numCols; col++) {
        const tileWidth =
          col < numCols - 1 ? columnWidth : width - columnWidth * (numCols - 1);

        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight
        );
      }
    }
  }
}
class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = [];
    this.workQueue = [];
    this.workerMap = new Map();

    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };

      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }

  _workerDone(worker, error, response) {
    const [resolver, rejector] = this.workerMap.get(worker);
    this.workerMap.delete(worker);

    if (this.workQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const [work, resolver, rejector] = this.workQueue.shift();
      this.workerMap.set(worker, [resolver, rejector]);
      worker.postMessage(work);
    }
    error === null ? resolver(response) : rejector(error);
  }

  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        const worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workQueue.push([work, resolve, reject]);
      }
    });
  }
}

const ROWS = 3,
  COLS = 4;
const NUM_WORKERS = navigator.hardwareConcurrency || 2;

class SierpinskiCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.workerPool = new WorkerPool(NUM_WORKERS, "worker.js");
    this.setSize();

    //https://developer.mozilla.org/ja/docs/Web/API/Window/resize_event
    window.addEventListener("resize", () => this.handleResize());
    this.render();
  }

  setSize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
  }

  handleResize() {
    // タイムアウトがないと、何回も描画が行われる
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.setSize();
      this.render();
    }, 200);
  }

  render() {
    const promises = this.tiles.map((tile) =>
      this.workerPool.addWork({
        tile,
        canvasWidth: this.width,
        canvasHeight: this.height,
        maxDepth: 8,
      })
    );

    Promise.all(promises).then((results) => {
      for (const r of results) {
        this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
      }
    });
  }
}

const canvas = document.createElement("canvas");
document.body.style.margin = "0";
document.body.appendChild(canvas);
new SierpinskiCanvas(canvas);
