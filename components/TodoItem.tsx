import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from 'react-native';

// Tipe untuk props komponen TodoItem
type TodoItemProps = {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.row}>
        <CheckBox value={todo.completed} onValueChange={onToggle} />
        <Text
          style={[
            styles.text,
            todo.completed ? styles.completedText : null,
          ]}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});