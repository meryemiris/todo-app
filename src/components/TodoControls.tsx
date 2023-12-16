import { HStack } from "@chakra-ui/react";
import ToggleTheme from "../utils/ToggleTheme";
import NewTodo from "./NewTodo";
import RandomTodo from "./RandomTodo";
import TodosModel from "../models/todo";
import React from "react";

interface TodoControlsProps {
  onAdd: (todo: string) => void;
  todoList: TodosModel[];
}

const TodoControls: React.FC<TodoControlsProps> = ({ onAdd, todoList }) => {
  return (
    <HStack
      mx={5}
      minW={"300px"}
      direction={["column", "row"]}
      align={["stretch", "center"]}
      justifyContent={["center", "space-between"]}
      w={"100%"}
    >
      <RandomTodo todoList={todoList} />
      <NewTodo onAdd={onAdd} todoList={todoList} />
      <ToggleTheme />
    </HStack>
  );
};

export default TodoControls;
