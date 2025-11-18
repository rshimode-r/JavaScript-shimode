const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(displayTodos) {
  list.innerHTML = "";
  displayTodos.forEach((t) => {
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
      const indexInTodos = todos.indexOf(t);
      todos.splice(indexInTodos, 1);
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

document.querySelector("#all").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/all");
  renderTodos(getDisplayTodos());
});

document.querySelector("#active").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/active");
  renderTodos(getDisplayTodos());
});

document.querySelector("#completed").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/completed");
  renderTodos(getDisplayTodos());
});

function getDisplayTodos() {
  const path = location.pathname;
  if (path.endsWith("/active")) return todos.filter((t) => !t.completed);
  if (path.endsWith("/completed")) return todos.filter((t) => t.completed);
  return todos;
}
