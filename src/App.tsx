import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import Header from "./components/Header";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setIsAdd] = useState(false);

  const [showHeader, setShowHeader] = useState(true);

  function showFormHandler() {
    setIsAdd(true);
    setShowHeader(false);
  }

  const addTodoHandler = (text: string, status: string) => {
    const newTodo = new Todo(text, status);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  return (
    <>
      {showHeader && <Header onShow={showFormHandler} />}
      {isAdd && <NewTodo onAdd={addTodoHandler} />}
      {todos.length > 0 && <Todos items={todos} />}
    </>
  );
}

export default App;
