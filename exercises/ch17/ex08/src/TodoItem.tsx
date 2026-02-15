export type Todo = {
    id: string;
    text: string;
    done: boolean;
};

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />

            <label
                style={{
                    textDecorationLine: todo.done ? "line-through" : "none",
                }}
            >
                {todo.text}
            </label>

            <button onClick={() => onDelete(todo.id)}>❌</button>
        </li>
    );
}
