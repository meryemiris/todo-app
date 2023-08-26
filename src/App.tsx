import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import Header from "./components/Header";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showHeader, setHideHeader] = useState(true);

  function showFormHandler() {
    setIsAdd(true);
    setHideHeader(false);
  }
  function hideFormHandler() {
    setIsAdd(false);
  }

  function showListHandler() {
    if (todos) {
      setShowList(true);
    }
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
      {isAdd && <NewTodo onAdd={addTodoHandler} onHide={hideFormHandler} />}
      {showList && <Todos items={todos} onShow={showListHandler} />}
    </>
  );
}

export default App;
