const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  setUILock(true);
  try {
    const response = await fetchWithRetry("/api/tasks", { method: "GET" });
    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (e) {
    alert(e.message);
  } finally {
    setUILock(false);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
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
  setUILock(true);

  try {
    const response = await fetchWithRetry("/api/tasks", {
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
    alert(e.message);
  } finally {
    setUILock(false);
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

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "削除";
  toggle.addEventListener("change", async () => {
    const newStatus = toggle.checked ? "completed" : "active";
    setUILock(true);

    try {
      const reponse = await fetchWithRetry(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!reponse.ok) {
        const error = await reponse.json();
        alert(error.message);
        toggle.checked = !toggle.checked; // rollback
        return;
      }

      task.status = newStatus;
      label.style.textDecorationLine =
        newStatus === "completed" ? "line-through" : "none";
    } catch (e) {
      alert(e.message);
      toggle.checked = !toggle.checked;
    } finally {
      setUILock(false);
    }
  });

  destroy.addEventListener("click", async () => {
    setUILock(true);
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
    } catch {
      alert("削除に失敗しました");
    } finally {
      setUILock(false);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

function setUILock(isLock) {
  input.disabled = isLock;
  form.querySelector("button").disabled = isLock;

  list.querySelectorAll("li").forEach((li) => {
    const toggle = li.querySelector('input[type="checkbox"]');
    const destroy = li.querySelector("button");
    if (toggle) toggle.disabled = isLock;
    if (destroy) destroy.disabled = isLock;
  });
}

async function fetchWithRetry(url, options = {}, maxRetry = 3, timeout = 3000) {
  for (let i = 0; i < maxRetry; i++) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timerId);

      if (response.status >= 500) {
        if (i === maxRetry - 1) throw new Error("サーバエラーが続きました");
        await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
        continue;
      }

      return response;
    } catch (e) {
      clearTimeout(timerId);
      if (e.name === "AbortError")
        throw new Error("リクエストがタイムアウトしました");
      if (i === maxRetry - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
    }
  }
}
