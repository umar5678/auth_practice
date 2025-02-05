import Button from "./ui/Button";

const DisplayTodos = ({ todos, editTodo, deleteTodo, toggleComplete }) => {
  const toggleTodoCompletion = (index) => {
    toggleComplete(index);
  };

  const handleEditTodo = (index) => {
    editTodo(index);
  };

  const handleDeleteTodo = (index) => {
    deleteTodo(index);
  };

  console.log("displey Todos render");

  return (
    <div>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <div
            key={index}
            className="flex text-gray-300 items-center my-2 max-w-md mx-auto"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodoCompletion(index)}
              id={`todo-${index}`}
              className="h-5 w-5 mr-4"
            />
            <p
              className={`flex-grow ${
                todo.isCompleted ? "text-green-500 line-through" : ""
              }`}
            >
              {todo.title}
            </p>
            <Button
              size="sm"
              className="mr-4"
              onClick={() => handleEditTodo(index)}
            >
              Edit
            </Button>
            <Button size="sm" onClick={() => handleDeleteTodo(index)}>
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
