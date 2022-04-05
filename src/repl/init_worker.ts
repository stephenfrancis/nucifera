if (window.Worker) {
  var myWorker = new Worker(new URL("./worker.ts"));
  myWorker.onmessage = function (e) {
    console.log(`Message received from worker: ${e.data}`);
  };
  myWorker.postMessage([3, 6]);
} else {
  console.warn("web worker API unavailable");
}
