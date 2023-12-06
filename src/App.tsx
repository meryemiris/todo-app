import { useState, useEffect } from "react";
import Todos from "./components/Todos";
import TodosModel from "./models/todo";

function App() {
  const initialTodoAppData = JSON.parse(
    localStorage.getItem("todoAppData") || "{}"
  );

  const [todos, setTodos] = useState<TodosModel[]>(
    initialTodoAppData.todos || []
  );
  useEffect(() => {
    localStorage.setItem("todoAppData", JSON.stringify({ todos }));
  }, [todos]);

  const addTodoHandler = (text: string) => {
    const newTodo = new TodosModel(text);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodoHandler = (itemID: string) => {
    const newTodos = todos.filter((todo) => todo.id !== itemID);
    setTodos(newTodos);
    localStorage.removeItem(itemID);
  };

  const editTodoHandler = (itemID: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === itemID ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <Todos
      todoList={todos}
      setTodos={setTodos}
      onRemove={removeTodoHandler}
      onAdd={addTodoHandler}
      onEdit={editTodoHandler}
    />
  );
}

export default App;
