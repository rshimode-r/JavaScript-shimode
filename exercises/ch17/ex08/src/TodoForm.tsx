import { useState } from "react";

type TodoFormProps = {
    onAdd: (text: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = input.trim();
        if (!trimmed) return;

        onAdd(trimmed);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button type="submit">Add</button>
        </form>
    );
}
