import { interceptedApi } from "./api"; // it uses axios api


// /api/v1/todos GET
// /api/v1/todos POST
// /api/v1/todos/:todoId GET
// /api/v1/todos/:todoId POST update
// /api/v1/todos/:todoId DELETE

 

const baseUrl = "/todos"

// GET all Todos
const getAllTodos = async () => {
    try {
      console.log("client run")
    const response = await interceptedApi.get(baseUrl);
    return response.data; // Return response data
  } catch (error) {
    throw error; // Handle errors accordingly
  }
};

// CREATE a new Todo
const createTodo = async (todoData) => {
  try {
    const response = await interceptedApi.post(baseUrl, todoData);
    return response.data; // Return created Todo
  } catch (error) {
    throw error; // Handle errors accordingly
  }
};

// GET a single Todo by ID
const getSingleTodo = async (todoId) => {
  try {
    const response = await interceptedApi.get(`${baseUrl}/${todoId}`);
    return response.data; // Return single Todo data
  } catch (error) {
    throw error; // Handle errors accordingly
  }
};

// UPDATE a Todo by ID
const updateTodo = async (todoId, updatedData) => {
  try {
    const response = await interceptedApi.put(`${baseUrl}/${todoId}`, updatedData);
    return response.data; // Return updated Todo
  } catch (error) {
    throw error; // Handle errors accordingly
  }
};

// DELETE a Todo by ID
const deleteTodo = async (todoId) => {
  try {
    const response = await interceptedApi.delete(`${baseUrl}/${todoId}`);
    return response.data; // Return response on successful deletion
  } catch (error) {
    throw error; // Handle errors accordingly
  }
};




export {getAllTodos, createTodo, getSingleTodo, updateTodo, deleteTodo}