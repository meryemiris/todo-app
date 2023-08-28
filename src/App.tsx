import { useState, useEffect } from "react";

import Todo from "./models/todo";
import Todos from "./components/Todos";
import NewTodo from "./components/NewTodo";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos") as string);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodoHandler = (itemID: string) => {
    const newTodos = todos.filter((todo) => todo.id !== itemID);
    setTodos(newTodos);
    localStorage.removeItem(itemID);
  };

  return (
    <>
      <NewTodo onAdd={addTodoHandler} items={todos} />
      <Todos items={todos} setItems={setTodos} onRemove={removeTodoHandler} />
    </>
  );
}

export default App;
