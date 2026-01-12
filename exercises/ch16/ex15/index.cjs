const threads = require("worker_threads");

if (threads.isMainThread) {
  let num = 0;
  let worker = new threads.Worker(__filename);

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }
    worker.on("message", (message) => {
      if (message === "inc") {
        num++;
      } else if (message === "done") {
        console.log(num);
      }
    });
  });
} else {
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("inc");
  }
  threads.parentPort.postMessage("done");
}
