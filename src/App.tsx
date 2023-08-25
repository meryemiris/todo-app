import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setIsAdd] = useState(false);

  function showFormHandler() {
    setIsAdd(true);
  }
  function hideFormHandler() {
    setIsAdd(false);
  }

  const addTodoHandler = (text: string, status: string) => {
    const newTodo = new Todo(text, status);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };
  return (
    <>
      {isAdd && <NewTodo onAdd={addTodoHandler} onHide={hideFormHandler} />}
      <Todos items={todos} onShow={showFormHandler} />
    </>
  );
}

export default App;
