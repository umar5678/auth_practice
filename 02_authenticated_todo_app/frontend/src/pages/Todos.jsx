import { useState } from "react";
import Button from "../components/ui/Button";
import TodoModal from "../components/modals/TodoModal";
import DisplayTodos from "../components/DisplayTodos";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMSg from "../components/ui/ErrorMsg";
import { useTodoContext } from "../context/TodoContext";

const Todos = () => {
  const {
    todos,
    addTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    toggleComplete,
    loading,
    error,
  } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleCreateTodo = () => {
    setEditingTodoId(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    setIsModalOpen(true);
  };

  const handleSubmitTodo = (todoData) => {
    if (editingTodoId !== null) {
      handleUpdateTodo(editingTodoId, todoData);
    } else {
      addTodo(todoData);
    }
    setIsModalOpen(false);
  };

  const initialTodo = todos?.find((todo) => todo._id === editingTodoId) || null;

  return (
    <div>
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : null}
      <h1 className="dark:text-gray-100">Home</h1>
      <Button onClick={handleCreateTodo}>Add Todo</Button>

      {error ? (
        <>
          <ErrorMSg message={error} />
        </>
      ) : null}

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTodo}
        initialTodo={initialTodo}
        isEditing={editingTodoId !== null}
      />

      <DisplayTodos
        todos={todos}
        editTodo={handleEditTodo}
        deleteTodo={handleDeleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default Todos;
