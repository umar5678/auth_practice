
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

const Home = () => {
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

export default Home;

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



// import { useState } from "react";
// import Button from "../components/ui/Button";
// import TodoModal from "../components/modals/TodoModal";
// import DisplayTodos from "../components/DisplayTodos";

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);

//   const handleCreateTodo = () => {
//     setCurrentTodo(null); // Reset currentTodo for new creation
//     setIsModalOpen(true);
//   };

//   const handleEditTodo = (index) => {
//     setCurrentTodo({ ...todos[index], index }); // Add the index for identification
//     setIsModalOpen(true);
//   };

//   const handleDeleteTodo = (index) => {
//     setTodos(todos.filter((_, idx) => idx !== index)); // Remove the selected todo
//   };

//   const handleSubmitTodo = (todo) => {
//     if (todo.index !== undefined) {
//       // If editing, update the specific todo
//       const updatedTodos = [...todos];
//       updatedTodos[todo.index] = {
//         title: todo.title,
//         isCompleted: todo.isCompleted,
//       };
//       setTodos(updatedTodos);
//     } else {
//       // If creating, add a new todo
//       setTodos([{ title: todo.title, isCompleted: false }, ...todos]);
//     }
//     setCurrentTodo(null); // Clear currentTodo after submission
//   };

//   const toggleTodoCompletion = (index) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
//     setTodos(updatedTodos);
//   };

//   return (
//     <div>
//       <h1 className="dark:text-gray-100">Home</h1>
//       <Button onClick={handleCreateTodo}>Add Todo</Button>

//       <TodoModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleSubmitTodo}
//         initialTodo={currentTodo}
//         isEditing={!!currentTodo}
//       />

//       {/* Display Todos */}

//       <DisplayTodos
//         todos={todos}
//         editTodo={handleEditTodo}
//         deleteTodo={handleDeleteTodo}
//         toggleComplete={toggleTodoCompletion}
//       />
//     </div>
//   );
// };

// export default Home;



//

//
//

//
//
//
//

//
//
//

// import React, { useState } from "react";
// import Button from "../components/ui/Button";
// import Modal from "../components/modals/Modal";
// import Input from "../components/ui/Input";
// import TodoModal from "../components/modals/TodoModal";

// const Home = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);

//   const handleCreateTodo = () => {
//     setIsEditing(false);
//     setCurrentTodo({ title: "", isCompleted: false });
//     setIsModalOpen(true);
//   };

//   const handleEditTodo = (index) => {
//     setIsEditing(true);
// const currTodo = todos[index]
//     setCurrentTodo({...currTodo});
//     console.log("currTodo", { ...currTodo })
//     console.log( "current",currentTodo)
//     setIsModalOpen(true);
//   };

//   const handleDeleteTodo = (index) => {
//     setTodos(todos.filter((_, idx) => idx !== index));
//   };

//   const handleSubmitTodo = (todo) => {
//     if (todo.index != undefined) {
//       const updatedTodo = [...todos];
//       updatedTodo[todo.index] = {
//         title: todo.title,
//         isCompleted: todo.isCompleted,
//       };

//       setTodos(updatedTodo);
//       // Update currentTodo to reflect the changes
//       setCurrentTodo({ ...updatedTodo[todo.index] });

//       setIsModalOpen(false);
//     } else {
//       setTodos([{ title: todo.title, isCompleted: false }, ...todos]);

//       setIsModalOpen(false);
//     }
//   };

//   const toggleTodoCompletion = (index) => {
//     const updatedTodo = [...todos];
//     updatedTodo[index].isCompleted = !updatedTodo[index].isCompleted;
//     setTodos(updatedTodo);
//   };
//   const closeModal = () => {
//     // setCurrentTodo({ title: "", isCompleted: null });
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <h1 className="dark:text-gray-100">Home</h1>
//       <Button onClick={handleCreateTodo}>Add Todo</Button>

//       {/* // TodoModal is now self closing */}

//       <TodoModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={handleSubmitTodo}
//         initialTodo={currentTodo}
//         isEditing={isEditing}
//       />

//       {/* display Todos */}

//       <div>
//         {todos.length > 0 ? (
//           todos.map((todo, index) => (
//             <div
//               key={index}
//               className="flex text-gray-300 items-center my-2 max-w-md mx-auto"
//             >
//               <input
//                 type="checkbox"
//                 checked={todo.isCompleted}
//                 onChange={() => toggleTodoCompletion(index)}
//                 id={`todo-${index}`}
//                 className="h-5 w-5 mr-4"
//               />
//               <p
//                 className={`flex-grow ${
//                   todo.isCompleted ? "text-green-500 line-through" : ""
//                 }`}
//               >
//                 {todo.title}
//               </p>
//               <Button
//                 size="sm"
//                 className="mr-4"
//                 onClick={() => handleEditTodo(index)}
//               >
//                 Edit
//               </Button>
//               <Button size="sm" onClick={() => handleDeleteTodo(index)}>
//                 Delete
//               </Button>
//             </div>
//           ))
//         ) : (
//           <h1 className="dark:text-gray-300">No Todos Available</h1>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const [todos, setTodos] = useState([]);

//   const [singleTodo, setSingleTodo] = useState({
//     title: "",
//     isCompleted: null,
//   });

//   const handleTodoChange = (value) => {
//     setSingleTodo((prev) => ({ ...prev, title: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setTodos((prev) => [singleTodo, ...prev]);
//     setSingleTodo({ title: "", isCompleted: null });
//   };
//   const closeModal = () => {
//     setSingleTodo({ title: "", isCompleted: null });
//     setIsOpen(false)

//   }

//   const handleTodoCheck = (index) => {
//     const updatedTodos = [...todos]
//     updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted
//     setTodos(updatedTodos)
//   };

//   const editTodo = (todo) => {

//   };

//   const deleteTodo = (todo) => {
//     setTodos([...todos].filter((_, index) => index != todo));
//   };

//   return (
//     <div>
//       <h1 className="dark:text-gray-100">Home</h1>

//       <Button onClick={() => setIsOpen(() => true)}>Add Todo</Button>

//       <Modal
//         isOpen={isOpen}
//         title={"Modal Test"}
//         onClose={closeModal}
//       >
//         <form action="" onSubmit={handleSubmit}>
//           <Input
//             value={singleTodo.title}
//             onChange={(e) => handleTodoChange(e.target.value)}
//             label="Write Todo"
//           ></Input>
//           <div className="flex justify-between">
//             <Button variant="primary-outline" className="mt-4" type="submit">
//               Add Todo
//             </Button>
//             <Button variant="default-outline" className="mt-4" onClick={closeModal}>
//               Cancle
//             </Button>
//           </div>
//         </form>
//       </Modal>

//       {/* Display Todos */}

//       <div>
//         {todos.length > 0 ? (
//           <>
//             {todos.map((todo, index) => (
//               <div
//                 key={index}
//                 className="flex text-gray-300 item-center my-2 max-w-md mx-auto"
//               >
//                 <input
//                   type="checkbox"
//                   checked={todo.isCompleted}
//                   onChange={() => handleTodoCheck(index)}
//                   id={`todo-${index}`}
//                   className="h-5 w-5 mr-4"
//                 />
//                 <p
//                   className={`flex-grow ${
//                     todo.isCompleted ? "text-green-500" : ""
//                   }`}
//                 >
//                   {todo.title}
//                 </p>
//                 <Button
//                   size="sm"
//                   className="mr-4"
//                   onClick={() => editTodo(index)}
//                 >
//                   Edit
//                 </Button>

//                 <Button size="sm" onClick={() => deleteTodo(index)}>
//                   Delete
//                 </Button>
//               </div>
//             ))}
//           </>
//         ) : (
//           <>
//             <h1 className="dark:text-gray-300">No Todos Availble</h1>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
