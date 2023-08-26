import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import Header from "./components/Header";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showList, setShowList] = useState(false);
  // const [hideForm, setHideForm] = useState(false);

  function showFormHandler() {
    setIsAdd(true);
    setShowHeader(false);
    setShowList(false);
  }

  function hideFormHandler() {
    setIsAdd(false);
    setShowList(true);
  }

  const addTodoHandler = (text: string, status: string) => {
    const newTodo = new Todo(text, status);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
    setShowList(true);
  };

  return (
    <>
      {showHeader && <Header onShow={showFormHandler} />}
      {isAdd && <NewTodo onAdd={addTodoHandler} onHide={hideFormHandler} />}
      {showList && <Todos items={todos} />}
    </>
  );
}

export default App;
