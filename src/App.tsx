import { useState, useEffect } from "react";
import Todos from "./components/Todos";
import TodosModel from "./models/todo";

import TodoControls from "./components/TodoControls";

const STORAGE_KEY = "todoAppData";

function getInitialTodos() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);

      return Array.isArray(parsedData.todos) && parsedData.todos.length > 0
        ? parsedData.todos.map((todo: TodosModel) => ({
            ...todo,
            timestamp: new Date(todo.timestamp),
          }))
        : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);

      return [];
    }
  } else {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState<TodosModel[]>(getInitialTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos }));
  }, [todos]);

  const addTodoHandler = (text: string) => {
    const newTodo = new TodosModel(text, new Date());
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const editTodoHandler = (itemId: string, newText: string) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      )
    );
  };

  const removeTodoHandler = (itemID: string) => {
    const newTodos = todos.filter((todo) => todo.id !== itemID);
    setTodos(newTodos);
    localStorage.removeItem(itemID);
  };

  return (
    <>
      <TodoControls todoList={todos} onAdd={addTodoHandler} />
      <Todos
        todoList={todos}
        setTodos={setTodos}
        onRemove={removeTodoHandler}
        onEdit={editTodoHandler}
      />
    </>
  );
}

export default App;
