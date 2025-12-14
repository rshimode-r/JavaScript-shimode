const uploadButton = document.getElementById("uploadButton");
const result = document.getElementById("result");

uploadButton.addEventListener("click", async () => {
  const token = document.getElementById("token").value.trim();
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!token) {
    alert("アクセストークンを入力してください");
    return;
  }
  if (!file) {
    alert("ファイルを選択してください");
    return;
  }

  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(
    file.name
  )}:/content`;

  uploadButton.disabled = true;
  result.textContent = "アップロード中...";
  //disabled確認用
  //   await new Promise((r) => setTimeout(r, 5000));

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    result.textContent = "アップロード成功！";
    fileInput.value = "";
  } catch (err) {
    result.textContent =
      "エラーが発生しました:\n\n" + JSON.stringify(err, null, 2);
  } finally {
    uploadButton.disabled = false;
  }
});
