import { useState, useCallback } from "react";
import Button from "../components/ui/Button";
import TodoModal from "../components/modals/TodoModal";
import DisplayTodos from "../components/DisplayTodos";

const useTodoManager = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((newTodo) => {
    setTodos((prevTodos) => [...prevTodos, { ...newTodo, isCompleted: false }]); // Correct update
  }, []);

  const updateTodo = useCallback((index, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, idx) =>
        idx === index ? { ...todo, ...updatedTodo } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, idx) => idx !== index));
  }, []);

  const toggleComplete = useCallback((index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, idx) =>
        idx === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  return { todos, addTodo, updateTodo, deleteTodo, toggleComplete };
};

const Todos = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } =
    useTodoManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);

  const handleCreateTodo = () => {
    setEditingTodoIndex(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (index) => {
    setEditingTodoIndex(index);
    setIsModalOpen(true);
  };

  const handleSubmitTodo = (todoData) => {
    if (editingTodoIndex !== null) {
      updateTodo(editingTodoIndex, todoData);
    } else {
      addTodo(todoData);
    }
    setIsModalOpen(false);
  };

  const initialTodo =
    editingTodoIndex !== null ? todos[editingTodoIndex] : null;

  return (
    <div>
      <h1 className="dark:text-gray-100">Home</h1>
      <Button onClick={handleCreateTodo}>Add Todo</Button>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTodo}
        initialTodo={initialTodo}
        isEditing={editingTodoIndex !== null}
      />

      <DisplayTodos
        todos={todos}
        editTodo={handleEditTodo}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default Todos;
