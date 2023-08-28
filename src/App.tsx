import { useState, useEffect } from "react";

import Todo from "./models/todo";

import Todos from "./components/Todos";
import NewTodo from "./components/NewTodo";

function App() {
  const todoList = JSON.parse(localStorage.getItem("todos") as string);

  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });

    if (newTodo.text.length === 0) {
      setShowList(false);
    }
  };

  const removeTodoHandler = (itemID: string) => {
    const newTodos = todos.filter((todo) => todo.id !== itemID);
    setTodos(newTodos);
    localStorage.removeItem(itemID);
  };

  const checkTodoHandler = () => {
    setShowList(true);
  };

  return (
    <>
      <NewTodo onAdd={addTodoHandler} items={todos} />

      {showList && (
        <Todos
          items={todos}
          setItems={setTodos}
          onRemove={removeTodoHandler}
          onCheck={checkTodoHandler}
        />
      )}
    </>
  );
}

export default App;
