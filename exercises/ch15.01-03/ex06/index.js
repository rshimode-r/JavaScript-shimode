const box = document.getElementById("infoBox");

const details = {
  ユーザーエージェント: navigator.userAgent,
  プラットフォーム: navigator.platform,
  言語: navigator.language,
  コア数: navigator.hardwareConcurrency,
  "メモリ(GB)": navigator.deviceMemory,
  クッキー: navigator.cookieEnabled ? "有効" : "無効",
};
console.log(navigator);

//infoBoxに挿入
for (const [key, value] of Object.entries(details)) {
  const p = document.createElement("p");
  p.textContent = `${key}：${value}`;
  box.appendChild(p);
}
