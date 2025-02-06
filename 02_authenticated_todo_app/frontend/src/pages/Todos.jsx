import { useState, useCallback, useEffect } from "react";
import Button from "../components/ui/Button";
import TodoModal from "../components/modals/TodoModal";
import DisplayTodos from "../components/DisplayTodos";

// import {
//   getAllTodos,
//   createTodo,
//   getSingleTodo,
//   toggleTodoComplete,
//   updateTodo,
//   deleteTodo,
// } from "../services/todoServices";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMSg from "../components/ui/ErrorMsg";

// const useTodoManager = () => {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // fetch all todos on mount

//   useEffect(() => {
//     const fetchTodo = async () => {
//       setLoading(true);
//       try {
//         const data = await getAllTodos();
//         console.log(data.todos);
//       } catch (error) {
//         console.log("get all todos error", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTodo();
//   }, []);

//   const addTodo = useCallback(async (newTodo) => {
//     setLoading(true);
//     try {
//       const createdTodo = await createTodo(newTodo);
//       const myTodo = createdTodo.data;

//       setTodos((prev) => [...prev, { ...myTodo }]);
//     } catch (error) {
//       console.error(error);
//       setError("Create Todo Error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleUpdateTodo = useCallback(async (todoId, updatedTodo) => {
//     setLoading(true);
//     try {
//       const updatedTodoData = await updateTodo(todoId, updatedTodo);
//       const myTodo = updatedTodoData.data;
//       setTodos((prev) =>
//         prev.map((todo) =>
//           todo._id === todoId ? { ...todo, ...myTodo } : todo
//         )
//       );
//     } catch (error) {
//       console.error("Udated todo error:", error);
//     } finally {
//       setLoading(false);
//     }

//     // setTodos((prevTodos) =>
//     //   prevTodos.map((todo, idx) =>
//     //     idx === index ? { ...todo, ...updatedTodo } : todo
//     //   )
//     // );
//   }, []);

//   const handleDeleteTodo = useCallback(async (todoId) => {
//     setLoading(true);
//     try {
//       const deletedTodo = await deleteTodo(todoId);
//       setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
//     } catch (error) {
//       console.error("delete todo error: ", error);
//     } finally {
//       setLoading(false);
//     }
//     // setTodos((prevTodos) => prevTodos.filter((_, idx) => idx !== index));
//   }, []);

//   const toggleComplete = useCallback(async (todoId) => {
//     setLoading(true);
//     try {
//       const response = await toggleTodoComplete(todoId);
//       const updatedTodoFromApi = response.data;
//       setTodos((prevTodos) =>
//         prevTodos.map((todo) =>
//           todo._id === todoId
//             ? { ...todo, isCompleted: updatedTodoFromApi.isCompleted }
//             : todo
//         )
//       );
//     } catch (error) {
//       console.error("toggle todo error: ", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
//   return {
//     todos,
//     addTodo,
//     handleUpdateTodo,
//     handleDeleteTodo,
//     toggleComplete,
//     loading,
//     error,
//   };
// };

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
    // fetchTodos,
  } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // useEffect(() => {
  //   fetchTodos();
  // }, [fetchTodos]);

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
