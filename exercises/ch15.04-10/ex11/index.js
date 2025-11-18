const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
let todos = [];

function renderTodos(displayTodos) {
  list.innerHTML = "";
  displayTodos.forEach((t, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", t.completed);
    toggle.addEventListener("change", () => {
      t.completed = toggle.checked;
      renderTodos(getDisplayTodos());
    });
    label.textContent = t.content;
    toggle.checked = t.completed;
    destroy.addEventListener("click", () => {
      displayTodos.splice(index, 1);
      deleteTodo(t.content);
      renderTodos(getDisplayTodos());
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(getDisplayTodos());
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  const filtered = getDisplayTodos();

  renderTodos(filtered); //filterしたものだけ表示する
});

function deleteTodo(content) {
  todos = todos.filter((t) => t.content !== content);
}

// 追加
function getDisplayTodos() {
  const hash = location.hash;
  if (hash === "#/active") return todos.filter((t) => !t.completed);
  if (hash === "#/completed") return todos.filter((t) => t.completed);
  return todos;
}
