const BASE_URL = "http://localhost:11434";
const MODEL = "gemma:2b";

const chat = document.getElementById("chat");
const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");

// メッセージを画面に追加する
function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; //
  return div;
}

sendButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  promptInput.value = "";
  sendButton.disabled = true;

  addMessage(`You: ${prompt}`, "user");

  //AI用の枠を追加、メッセージは後から追加する
  const aiMessage = addMessage("AI: ", "ai");

  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });
  // https://developer.mozilla.org/ja/docs/Web/API/ReadableStream/getReader
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (!line) continue;
      const json = JSON.parse(line);
      if (json.message?.content) {
        aiMessage.textContent += json.message.content;
        chat.scrollTop = chat.scrollHeight;
      }
    }
  }

  sendButton.disabled = false;
});
