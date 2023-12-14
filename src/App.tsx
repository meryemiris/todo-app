import { useState, useEffect } from "react";
import Todos from "./components/Todos";
import TodosModel from "./models/todo";
import { Box, Heading, Stack } from "@chakra-ui/react";
import NewTodo from "./components/NewTodo";
import ToggleTheme from "./utils/ToggleTheme";
import RandomTodo from "./components/RandomTodo";

function App() {
  const storedData = localStorage.getItem("todoAppData");

  const parsedData = JSON.parse(storedData || "");

  const initialTodos =
    Array.isArray(parsedData.todos) && parsedData.todos.length > 0
      ? parsedData.todos.map((todo: TodosModel) => ({
          ...todo,
          timestamp: new Date(todo.timestamp),
        }))
      : [];

  const [todos, setTodos] = useState<TodosModel[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem("todoAppData", JSON.stringify({ todos }));
  }, [todos]);

  const addTodoHandler = (text: string) => {
    const newTodo = new TodosModel(text, new Date());
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodoHandler = (itemID: string) => {
    const newTodos = todos.filter((todo) => todo.id !== itemID);
    setTodos(newTodos);
    localStorage.removeItem(itemID);
  };

  return (
    <Box px={[4, 8]} py={4} minW={["100%", "80%"]}>
      <Stack
        direction={["column", "row"]}
        align={["stretch", "center"]}
        spacing={[4, 8]}
        justifyContent={["center", "space-between"]}
      >
        <RandomTodo todoList={todos} />
        <NewTodo onAdd={addTodoHandler} todoList={todos} />
        <ToggleTheme />
      </Stack>

      {todos.length === 0 ? (
        <Heading fontSize="md" mt={5} as="em" textAlign="center" flex="1">
          One Task at a Time!
        </Heading>
      ) : (
        <Todos
          todoList={todos}
          setTodos={setTodos}
          onRemove={removeTodoHandler}
        />
      )}
    </Box>
  );
}

export default App;
