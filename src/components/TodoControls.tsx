import { HStack } from "@chakra-ui/react";
import ToggleTheme from "../utils/ToggleTheme";
import NewTodo from "./NewTodo";
import RandomTodo from "./RandomTodo";
import TodosModel from "../models/todo";
import React, { useRef } from "react";

interface TodoControlsProps {
  onAdd: (todo: string) => void;
  todoList: TodosModel[];
}

const TodoControls: React.FC<TodoControlsProps> = ({ onAdd, todoList }) => {
  const randomTodoRef = useRef(null);
  return (
    <HStack
      direction={["column", "row"]}
      align={["stretch", "center"]}
      justifyContent={["center", "space-between"]}
      w={"100%"}
    >
      <RandomTodo todoList={todoList} inputRef={randomTodoRef} />
      <NewTodo
        onAdd={onAdd}
        todoList={todoList}
        randomTodoRef={randomTodoRef}
      />
      <ToggleTheme />
    </HStack>
  );
};

export default TodoControls;
