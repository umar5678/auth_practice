import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  getAllTodos,
  createTodo,
  getSingleTodo,
  toggleTodoComplete,
  updateTodo,
  deleteTodo,
} from "../services/todoServices";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch all todos on mount

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const data = await getAllTodos();
        setTodos(data?.data);
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
      const myTodo = createdTodo.data;

      setTodos((prev = []) => [...prev, { ...myTodo }]); // ✅ Ensure prev is an array
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
      const myTodo = updatedTodoData.data;

      setTodos((prev = []) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, ...myTodo } : todo
        )
      ); // ✅ Ensure prev is an array
    } catch (error) {
      console.error("Updated todo error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteTodo = useCallback(async (todoId) => {
    setLoading(true);
    try {
      await deleteTodo(todoId);
      setTodos((prev = []) => prev.filter((todo) => todo._id !== todoId)); // ✅ Ensure prev is an array
    } catch (error) {
      console.error("Delete todo error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleComplete = useCallback(async (todoId) => {
    setLoading(true);
    try {
      const response = await toggleTodoComplete(todoId);
      const updatedTodoFromApi = response.data;

      setTodos((prevTodos = []) =>
        prevTodos.map((todo) =>
          todo._id === todoId
            ? { ...todo, isCompleted: updatedTodoFromApi.isCompleted }
            : todo
        )
      ); // ✅ Ensure prevTodos is an array
    } catch (error) {
      console.error("Toggle todo error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        toggleComplete,
        loading,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
