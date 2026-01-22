import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';

// Tipe untuk todo item
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Memuat todos dari AsyncStorage saat komponen dimount
  useEffect(() => {
    loadTodos();
  }, []);

  // Fungsi untuk memuat todos dari AsyncStorage
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      Alert.alert('Error', 'Gagal memuat data todo');
    }
  };

  // Fungsi untuk menyimpan todos ke AsyncStorage
  const saveTodos = async (updatedTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
      Alert.alert('Error', 'Gagal menyimpan data todo');
    }
  };

  // Fungsi untuk menambah todo baru
  const addTodo = (title: string) => {
    if (title.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Fungsi untuk mengubah status todo (selesai/belum)
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Fungsi untuk menghapus todo
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List Sederhana</Text>
      
      <AddTodoForm onSubmit={addTodo} />
      
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada todo. Tambahkan todo baru!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
});