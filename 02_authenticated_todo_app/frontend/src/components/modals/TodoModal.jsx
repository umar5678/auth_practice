import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Modal from "../modals/Modal";
import Input from "../ui/Input";

const TodoModal = ({ isOpen, onClose, onSubmit, initialTodo, isEditing }) => {
  const [todo, setTodo] = useState({ title: "", isCompleted: false });

  // Update local state whenever initialTodo changes
  useEffect(() => {
    if (initialTodo) {
      setTodo(initialTodo);
    } else {
      setTodo({ title: "", isCompleted: false });
    }
  }, [initialTodo]);

  const handleChange = (value) => {
    setTodo((prev) => ({ ...prev, title: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todo); // Send updated or new todo to the parent
    setTodo({ title: "", isCompleted: false }); // Clear local state
    onClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? "Edit Todo" : "Create Todo"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input
          value={todo.title}
          onChange={(e) => handleChange(e.target.value)}
          label="Todo Title"
          inputClasses="max-w-sm"
        />
        <div className="flex justify-between">
          <Button variant="primary-outline" className="mt-4" type="submit">
            {isEditing ? "Save Changes" : "Add Todo"}
          </Button>
          <Button
            variant="default-outline"
            className="mt-4"
            onClick={() => {
              setTodo({ title: "", isCompleted: false });
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;

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
//
//
//
//
//
//
//

// const TodoModal = ({ isOpen, onClose, onSubmit, initialTodo, isEditing }) => {
//   const [todo, setTodo] = useState(
//     initialTodo || { title: "", isCompleted: false }
//   );

//   const handleChange = (value) => {
//     setTodo((prev) => ({ ...prev, title: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(todo);
//     onClose(); // Close modal after submission
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       title={isEditing ? "Edit Todo" : "Create Todo"}
//       onClose={onClose}
//     >
//       <form onSubmit={handleSubmit}>
//         <Input
//           value={todo.title}
//           onChange={(e) => handleChange(e.target.value)}
//           label="Todo Title"
//         />
//         <div className="flex justify-between">
//           <Button variant="primary-outline" className="mt-4" type="submit">
//             {isEditing ? "Save Changes" : "Add Todo"}
//           </Button>
//           <Button variant="default-outline" className="mt-4" onClick={onClose}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default TodoModal;

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
//

// import React, { useState } from "react"
// import Modal from "./Modal";
// import Input from "../ui/Input";
// import Button from "../ui/Button";

// const TodoModal = ({ isOpen, onClose, initialTodo, isEditing, onSubmit }) => {

//   const [todo, setTodo] = useState(
//     initialTodo ? initialTodo : { title: "", isCompleted: false }
//   );
// console.log("initial todo",initialTodo)
//   const handleChange = (value) => {
//     setTodo((prev) => ({ ...prev, title: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(todo);
//     // setTodo({ title: "", isCompleted: false });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       title={isEditing ? "Edit Todo" : "Create Todo"}
//       onClose={onClose}
//     >
//       <form action="" onSubmit={handleSubmit}>
//         <Input
//           value={todo.title}
//           onChange={(e) => handleChange(e.target.value)}
//           label="Todo Title"
//         />
//         <div className="flex justify-between">
//           <Button variant="primary-outline" className="mt-4" type="submit">
//             {isEditing ? "Save Changes" : "Add Todo"}
//           </Button>
//           <Button variant="default-outline" className="mt-4" onClick={onClose}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default TodoModal
