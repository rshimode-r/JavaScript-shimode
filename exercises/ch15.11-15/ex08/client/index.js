let requestSocket = null;
let responseSocket = null;
let requestSocketPromise = null;
const TIMEOUT = 10000;
const pendingRequests = new Map();

// WebSocket サーバに文字列データを含むリクエストメッセージを送信するsendRequest関数
export async function sendRequest(body) {
  if (!requestSocketPromise) {
    requestSocketPromise = new Promise((resolve) => {
      requestSocket = new WebSocket("ws://localhost:3003");

      requestSocket.addEventListener("open", () => resolve(requestSocket));

      requestSocket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        const { id, body, responder } = data;

        if (!responder) return;
        if (pendingRequests.has(id)) {
          pendingRequests.get(id).resolve(body);
          pendingRequests.delete(id);
        }
      });

      requestSocket.addEventListener("close", () => {
        for (const { reject } of pendingRequests.values()) {
          reject(new Error("WebSocket disconnected"));
        }
        pendingRequests.clear();
        requestSocketPromise = null;
      });
    });
  }
  await requestSocketPromise;
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    const message = JSON.stringify({ id, body });

    pendingRequests.set(id, { resolve, reject });
    requestSocket.send(message);

    const timer = setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.get(id).reject(new Error("Timeout"));
        pendingRequests.delete(id);
      }
    }, TIMEOUT);

    pendingRequests.get(id).resolve = (resBody) => {
      clearTimeout(timer);
      resolve(resBody);
    };
  });
}

// WebSocket 接続で、WebSocket サーバから転送されたリクエストメッセージを受信してレスポンスを返すResponder
export function startResponder() {
  if (responseSocket) return;

  responseSocket = new WebSocket("ws://localhost:3003");

  responseSocket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    const { id, body, responder } = data;

    // responder無限ループになるのを防ぐ
    if (responder) return;

    const response = {
      id,
      body: "Hello, " + body,
      responder: true,
    };

    responseSocket.send(JSON.stringify(response));
  });

  responseSocket.addEventListener("close", () => {
    responseSocket = null;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startResponder();

  const requestRows = document.querySelectorAll("#requests > div");
  requestRows.forEach((row) => {
    const input = row.querySelector("input");
    const button = row.querySelector("button");
    const responseSpan = row.querySelector(".response");

    button.addEventListener("click", async () => {
      const body = input.value;
      responseSpan.textContent = "送信中...";

      try {
        const response = await sendRequest(body);
        responseSpan.textContent = response;
      } catch (e) {
        responseSpan.textContent = e.message;
      }
    });
  });
});
