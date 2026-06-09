import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async Storage polyfill for web (since AsyncStorage is for React Native)
const storageKey = "todoList";

const getTodos = async () => {
  const data = await AsyncStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
};

const saveTodos = async (todos: Todo[]) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(todos));
};

type Todo = {
  id: string;
  text: string;
};

const LocalStorageTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    (async () => {
      const stored = await getTodos();
      setTodos(stored);
    })();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now().toString(), text: input };
    const updated = [...todos, newTodo];
    setTodos(updated);
    await saveTodos(updated);
    setInput("");
  };

  const deleteTodo = async (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    await saveTodos(updated);
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, text: editingText } : t,
    );
    setTodos(updated);
    await saveTodos(updated);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h2>Todo List</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah aktivitas..."
        />
        <button onClick={addTodo}>Tambah</button>
      </div>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ margin: "1rem 0", display: "flex", alignItems: "center" }}
          >
            {editingId === todo.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEdit(todo.id)}>Simpan</button>
                <button onClick={() => setEditingId(null)}>Batal</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{todo.text}</span>
                <button onClick={() => startEdit(todo.id, todo.text)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalStorageTodo;