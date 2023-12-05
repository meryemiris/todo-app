import { useState, useEffect } from "react";
import Todo from "./models/todo";
import Todos from "./components/Todos";

function App() {
  // Change the localStorage key to "todoAppData"
  const initialTodoAppData = JSON.parse(
    localStorage.getItem("todoAppData") || "{}"
  );

  const [todos, setTodos] = useState<Todo[]>(initialTodoAppData.todos || []);

  useEffect(() => {
    // Update localStorage key to "todoAppData"
    localStorage.setItem("todoAppData", JSON.stringify({ todos }));
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
      setTodos={setTodos}
      onRemove={removeTodoHandler}
      onAdd={addTodoHandler}
    />
  );
}

export default App;
