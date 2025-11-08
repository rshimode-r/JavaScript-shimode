const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

customElements.define(
  "todo-app",
  class TodoApp extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.form = this.shadowRoot.querySelector("#new-todo-form");
      // TODO: 残りを実装
      this.input = this.shadowRoot.querySelector("#new-todo");
      this.list = this.shadowRoot.querySelector("#todo-list");

      this.todos = [];

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = this.input.value.trim();
        if (!text) return;

        const todo = { text, completed: false };
        this.todos.push(todo);
        this.render();
        this.input.value = "";
        this.input.focus();
      });
    }

    render() {
      this.list.innerHTML = "";
      this.todos.forEach((todo) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => this.toggleTodo(todo.id));

        li.textContent = todo.text;
        if (todo.completed) li.className = "completed";

        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.style.marginLeft = "0.5rem";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.deleteTodo(todo.id);
        });

        li.insertBefore(checkbox, li.firstChild);
        li.appendChild(delBtn);

        this.list.appendChild(li);
      });
    }

    toggleTodo(id) {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.render();
    }

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.render();
    }
  }
);
