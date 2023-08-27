import { useState, useEffect } from "react";

import Todo from "./models/todo";

import Todos from "./components/Todos";
import NewTodo from "./components/NewTodo";
import Start from "./components/Start";

function App() {
  const todoList = JSON.parse(localStorage.getItem("todos") as string);

  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [isAdd, setIsAdd] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log();
  }, [todos]);

  function showFormHandler() {
    setIsAdd(true);
  }

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
    setShowList(true);
  };

  return (
    <>
      {isAdd ? (
        <NewTodo onAdd={addTodoHandler} />
      ) : (
        <Start onShow={showFormHandler} />
      )}
      {showList && <Todos items={todos} setItems={setTodos} />}
    </>
  );
}

export default App;
