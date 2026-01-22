import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipe data Todo (WAJIB untuk TypeScript)
type Todo = {
  id: string;
  text: string;
};

export default function LocalStorage() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load data saat app dibuka
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem("TODOS");
      if (data) {
        setTodos(JSON.parse(data));
      }
    } catch (error) {
      console.log("Gagal load todo");
    }
  };

  const saveTodos = async (data: Todo[]) => {
    try {
      await AsyncStorage.setItem("TODOS", JSON.stringify(data));
    } catch (error) {
      console.log("Gagal simpan todo");
    }
  };

  const addTodo = () => {
    if (todo.trim() === "") return;

    const newTodos: Todo[] = [
      ...todos,
      { id: Date.now().toString(), text: todo },
    ];

    setTodos(newTodos);
    saveTodos(newTodos);
    setTodo("");
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan todo..."
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// STYLE (WAJIB ADA)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 5,
  },
  addText: {
    color: "white",
    fontSize: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  todoText: {
    fontSize: 16,
  },
  delete: {
    color: "red",
  },
});
