import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string, status: string) => {
    const newTodo = new Todo(text, status);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };
  return (
    <>
      <NewTodo onAdd={addTodoHandler} />
      <Todos items={todos} />
    </>
  );
}

export default App;
