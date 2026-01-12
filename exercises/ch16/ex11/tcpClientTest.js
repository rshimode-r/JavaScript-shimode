import net from "net";

const PORT = 8080;
const HOST = "127.0.0.1";
const MAX_TRIAL = 30000;

const sockets = [];

async function testConnections() {
  for (let i = 0; i < MAX_TRIAL; i++) {
    try {
      const socket = net.createConnection({ host: HOST, port: PORT });

      socket.on("error", (err) => {
        console.log(`接続失敗 ${i + 1} 回目:`, err.code || err.message);
      });

      socket.on("connect", () => {
        sockets.push(socket);
        console.log(`接続成功 ${i + 1} 回目`);
      });

      await new Promise((res) => setTimeout(res, 1));
    } catch (err) {
      console.log(`例外で接続できず ${i + 1} 回目:`, err.message);
      break;
    }
  }

  console.log(`総接続成功数: ${sockets.length}`);
  console.log("Enterキーで全て切断します");
  process.stdin.once("data", () => {
    sockets.forEach((s) => s.destroy());
    process.exit(0);
  });
}

testConnections();
