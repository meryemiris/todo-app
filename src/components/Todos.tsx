import React from "react";
import { VStack, Text } from "@chakra-ui/react";

import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

interface TodosProps {
  todoList: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onAdd: (itemID: string, timestamp: number) => void;
  onRemove: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  todoList,
  onAdd,
  setTodos,
  onRemove,
}: TodosProps) => {
  return (
    <VStack align="center" spacing={4} width="100%" justifyContent="center">
      <NewTodo onAdd={onAdd} todoList={todoList} />

      <VStack width="75%" display="flex" justifyContent="space-between">
        {todoList.length === 0 ? (
          <Text as="em" textAlign="center" flex="1">
            One Task at a Time!
          </Text>
        ) : (
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todoList={todoList}
              setTodos={setTodos}
              onRemove={onRemove}
            />
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default Todos;
