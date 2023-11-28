import { useState, useEffect } from "react";

import Todo from "./models/todo";
import Todos from "./components/Todos";

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
    <Todos
      items={todos}
      setItems={setTodos}
      onRemove={removeTodoHandler}
      onAdd={addTodoHandler}
    />
  );
}

export default App;
