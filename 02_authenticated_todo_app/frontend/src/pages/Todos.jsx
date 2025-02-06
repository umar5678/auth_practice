import { useState, useCallback, useEffect } from "react";
import Button from "../components/ui/Button";
import TodoModal from "../components/modals/TodoModal";
import DisplayTodos from "../components/DisplayTodos";

import {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoServices";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMSg from "../components/ui/ErrorMsg";

const useTodoManager = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch all todos on mount

  useEffect(() => {
    const fetchTodo = async () => {
      console.log("cilent effect run");
      setLoading(true);
      try {
        const data = await getAllTodos();
        console.log(data.todos);
      } catch (error) {
        console.log("get all todos error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  const addTodo = useCallback(async (newTodo) => {
    setLoading(true);
    try {
      const createdTodo = await createTodo(newTodo);
      console.log(createdTodo.data);
      const myTodo = createdTodo.data;

      setTodos((prev) => [...prev, { ...myTodo }]);
      console.log(todos);
    } catch (error) {
      console.error(error);
      setError("Create Todo Error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateTodo = useCallback(async (todoId, updatedTodo) => {
    setLoading(true);
    try {
      const updatedTodoData = await updateTodo(todoId, updatedTodo);
      console.log("updated Todo data: ", updatedTodoData.data);
      const myTodo = updatedTodoData.data;
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, ...myTodo } : todo
        )
      );
    } catch (error) {
      console.error("Udated todo error:", error);
    } finally {
      setLoading(false);
    }

    // setTodos((prevTodos) =>
    //   prevTodos.map((todo, idx) =>
    //     idx === index ? { ...todo, ...updatedTodo } : todo
    //   )
    // );
  }, []);

  const handleDeleteTodo = useCallback(async (todoId) => {
    setLoading(true);
    try {
      const deletedTodo = await deleteTodo(todoId);
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("delete todo error: ", error);
    } finally {
      setLoading(false);
    }
    // setTodos((prevTodos) => prevTodos.filter((_, idx) => idx !== index));
  }, []);

  const toggleComplete = useCallback(
    async (todoId, updatedTodoData) => {
      // Receive updatedTodoData
      setLoading(true);
      try {
        const response = await updateTodo(todoId, updatedTodoData); // No need to construct updatedTodo here
        const updatedTodoFromApi = response.data;

        setTodos((prevTodos) =>
          prevTodos.map(
            (todo) => (todo._id === todoId ? updatedTodoFromApi : todo) // Update with API data
          )
        );
      } catch (error) {
        console.error("toggle todo error: ", error);
        // Revert UI change on error (optional)
        // ... (revert logic, same as before)
      } finally {
        setLoading(false);
      }
    },
    [updateTodo]
  ); // Remove todos from dependency array

  return {
    todos,
    addTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    toggleComplete,
    loading,
    error,
  };
};

const Todos = () => {
  const {
    todos,
    addTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    toggleComplete,
    loading,
    error,
  } = useTodoManager();
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

  const initialTodo = todos.find((todo) => todo._id === editingTodoId) || null;

  console.log(todos);

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
