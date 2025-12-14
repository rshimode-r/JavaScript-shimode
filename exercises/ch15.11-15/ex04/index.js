const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let memoryStore = [];

function loadTodos() {
  try {
    //https://developer.mozilla.org/ja/docs/Web/API/Storage/getItem
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return memoryStore;
  }
}

function saveTodos(todos) {
  try {
    //https://developer.mozilla.org/ja/docs/Web/API/Storage/setItem
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    memoryStore = todos; // localStorage が禁止されている場合
  }
}

function renderTodos() {
  list.innerHTML = "";
  const todos = loadTodos();

  todos.forEach((todo, index) => {
    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo.text;
    label.style.textDecorationLine = todo.done ? "line-through" : "none";

    const toggle = document.createElement("input");
    // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
    toggle.type = "checkbox";
    toggle.checked = todo.done;
    toggle.addEventListener("change", () => {
      todos[index].done = toggle.checked;
      saveTodos(todos);
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    });

    const destroy = document.createElement("button");
    // TODO: destroy がクリック (click) された場合に elem を削除しなさい
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.appendChild(elem);
  });
}

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // フォームを送信すると、ブラウザがページをリロードするためTODOが消えてしまうから。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const todos = loadTodos();

  todos.unshift({
    text: input.value.trim(),
    done: false,
  });

  // new-todo の中身は空にする
  input.value = "";

  saveTodos(todos);
  renderTodos();
});

// https://developer.mozilla.org/ja/docs/Web/API/Window/storage_event
window.addEventListener("storage", () => {
  renderTodos();
});

renderTodos();
