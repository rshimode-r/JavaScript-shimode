"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  button.disabled = true;
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    messageElement.textContent += data.value;

    if (data.done) {
      eventSource.close();
      button.disabled = false;
    }
  });

  eventSource.addEventListener("error", () => {
    eventSource.close();
    button.disabled = false;
  });
}
