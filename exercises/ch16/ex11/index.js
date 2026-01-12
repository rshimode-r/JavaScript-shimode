import net from "net";
const PORT = 8080;

const htmlForm = `
   <!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>`;

function htmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const server = net.createServer();
server.on("connection", (socket) => {
  let buffer = "";

  socket.on("data", (chunk) => {
    buffer += chunk.toString();

    // HTTP リクエストは ヘッダとボディが \r\n\r\n で区切られている
    if (buffer.indexOf("\r\n\r\n") === -1) return;
    const [headerPart, bodyPart] = buffer.split("\r\n\r\n");

    const headerLines = headerPart.split("\r\n");
    const [method, path] = headerLines[0].split(" ");

    const headers = {};
    for (let i = 1; i < headerLines.length; i++) {
      const [key, value] = headerLines[i].split(": ");
      if (key && value) headers[key.toLowerCase()] = value;
    }

    if (method === "GET" && path === "/") {
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: ${Buffer.byteLength(
        htmlForm
      )}\r\n\r\n${htmlForm}`;
      socket.write(response);
      socket.end();
      return;
    }

    // フォームから`/greeting`に POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
    if (method === "POST" && path === "/greeting") {
      const contentLength = parseInt(headers["content-length"] || "0", 10);
      if (bodyPart.length < contentLength) return;
      const body = bodyPart.slice(0, contentLength);

      const params = new URLSearchParams(body);
      const name = htmlEscape(params.get("name") || "");
      const greeting = htmlEscape(params.get("greeting") || "");

      const responseHTML = `
      <!doctype html>
      <html lang="ja">
        <head>
            <meta charset="UTF-8" />
            <title>Greeting</title>
        </head>
        <body>
            <p>name : ${name} ,  greeting : ${greeting}</p>
        </body>
      </html>`;

      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: ${Buffer.byteLength(
        responseHTML
      )}\r\n\r\n${responseHTML}`;
      socket.write(response);
      socket.end();
      return;
    }

    // 非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す
    if (path !== "/" && path !== "/greeting") {
      const msg = "Not Found";
      const response = `HTTP/1.1 404 Not Found\r\nContent-Length: ${Buffer.byteLength(
        msg
      )}\r\n\r\n${msg}`;
      socket.write(response);
      socket.end();
      return;
    } else {
      const msg = "Method Not Allowed";
      const response = `HTTP/1.1 405 Method Not Allowed\r\nContent-Length: ${Buffer.byteLength(
        msg
      )}\r\n\r\n${msg}`;
      socket.write(response);
      socket.end();
      return;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
