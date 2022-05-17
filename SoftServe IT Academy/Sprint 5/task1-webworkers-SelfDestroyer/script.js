function calculate() {
  const myWorker = new Worker("worker.js");
  const someValue = +document.querySelector("#inputNumber").value;
  const result = document.querySelector("#result");

  myWorker.onmessage = (e) => {
    result.innerText = `Result: ${e.data}`;
  };

  myWorker.postMessage({ data: someValue });
}
