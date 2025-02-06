import Button from "./ui/Button";

const DisplayTodos = ({ todos, editTodo, deleteTodo, toggleComplete }) => {
  const handleToggleComplete = (todoId) => {
    toggleComplete(todoId);
  };

  const handleEditTodo = (id) => {
    editTodo(id);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <div>
      {todos?.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex text-gray-300 items-center my-2 max-w-md mx-auto"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleComplete(todo._id)}
              className="h-5 w-5 mr-4"
            />
            <p
              value={todo.title}
              disabled
              className={`flex-grow ${
                todo.isCompleted ? "text-green-500 line-through" : ""
              }`}
            >
              {todo.title}
            </p>
            <Button
              size="sm"
              className="mr-4"
              onClick={() => handleEditTodo(todo._id)}
            >
              Edit
            </Button>
            <Button size="sm" onClick={() => handleDeleteTodo(todo._id)}>
              Delete
            </Button>
          </div>
        ))
      ) : (
        <h1 className="dark:text-gray-300">No Todos Available</h1>
      )}
    </div>
  );
};

export default DisplayTodos;
