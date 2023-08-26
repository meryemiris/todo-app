import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import Start from "./components/Start";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showList, setShowList] = useState(false);

  function showFormHandler() {
    setIsAdd(true);
    setShowList(false);
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
      {!isAdd && <Start onShow={showFormHandler} />}
      {isAdd && <NewTodo onAdd={addTodoHandler} />}
      {showList && <Todos items={todos} />}
    </>
  );
}

export default App;
