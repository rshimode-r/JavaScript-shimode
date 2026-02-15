import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem, type Todo } from "./TodoItem";
import './App.css';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([
      { id: crypto.randomUUID(), text, done: false },
      ...todos,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="page">
      <div className="app">
        <TodoForm onAdd={addTodo} />

        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
