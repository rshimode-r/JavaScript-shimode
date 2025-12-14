const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const DB_NAME = "todo-db";
const DB_VERSION = 1;
const STORE_NAME = "todos";

let db = null;

function withDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("completed", "completed", { unique: false });
      }
    };
  });
}

function getTodos() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function addTodo(text) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const todo = { text, completed: false };
    const request = store.add(todo);

    request.onsuccess = () => {
      const inserted = { ...todo, id: request.result };
      broadcast("add", inserted);
      resolve(inserted);
    };

    request.onerror = () => reject(request.error);
  });
}

function updateTodoStatus(id, completed) {
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const todo = request.result;
      if (!todo) return resolve(null);

      todo.completed = completed;

      const putRequest = store.put(todo);

      putRequest.onsuccess = () => {
        broadcast("update", todo);
        resolve(todo);
      };

      putRequest.onerror = () => reject(putRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
}

function deleteTodo(id) {
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      broadcast("delete", { id });
      resolve();
    };

    request.onerror = () => reject(request.error);
  });
}

// https://developer.mozilla.org/ja/docs/Web/API/Broadcast_Channel_API
const bc = new BroadcastChannel("todo-channel");
const myId = Math.random().toString(36).slice(2); //タブごとの一意のID

function broadcast(type, data) {
  bc.postMessage({ type, data, sender: myId });
}

//受信
bc.onmessage = (event) => {
  if (event.data.sender === myId) return;
  renderAllTodos();
};

function renderTodos(todo) {
  const elem = document.createElement("li");
  elem.dataset.id = todo.id;

  const label = document.createElement("label");
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.addEventListener("change", async () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    await updateTodoStatus(todo.id, toggle.checked);
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    elem.remove();
    await deleteTodo(todo.id);
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

const renderAllTodos = async () => {
  list.innerHTML = "";
  const todos = await getTodos();

  todos.sort((a, b) => a.id - b.id).forEach(renderTodos);
};

const initialize = async () => {
  await withDB();
  await renderAllTodos();
};

initialize();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const text = input.value.trim();
  input.value = "";
  const newTodo = await addTodo(text);
  renderTodos(newTodo);
});
