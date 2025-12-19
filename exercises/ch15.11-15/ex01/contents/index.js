const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    // FetchのWrapperーがあると便利
    const response = await fetch(`api/tasks`);
    // https://developer.mozilla.org/ja/docs/Web/API/Response/ok
    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }

    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (e) {
    alert("タスク一覧の取得に失敗しました");
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)→ページリロードを避けるため
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch(`api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }

    const task = await response.json();
    appendToDoItem(task);
  } catch (e) {
    alert("タスクの作成に失敗しました");
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";

    try {
      const response = await fetch(`api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);

        toggle.checked = !toggle.checked;
        return;
      }

      task.status = newStatus;
      label.style.textDecorationLine =
        newStatus === "completed" ? "line-through" : "none";
    } catch (e) {
      alert("タスク更新に失敗しました");
      toggle.checked = !toggle.checked;
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "削除";

  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`api/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      elem.remove();
    } catch (e) {
      alert("タスク削除に失敗しました");
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
console.log("document.cookie:", document.cookie);
