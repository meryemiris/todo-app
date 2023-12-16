import TodosModel from "../models/todo";

import TodoCard from "./TodoCard";

import { HStack } from "@chakra-ui/react";

interface TodosProps {
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

const renderTodoCards = (
  todoList: TodosModel[],
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>,
  onRemove: (itemID: string) => void
) => {
  return todoList.map((todo) => (
    <TodoCard
      key={todo.id}
      todo={todo}
      todoList={todoList}
      setTodos={setTodos}
      onRemove={onRemove}
    />
  ));
};

const Todos: React.FC<TodosProps> = ({
  todoList,
  setTodos,
  onRemove,
}: TodosProps) => {
  return (
    <HStack
      justifySelf={"flex-start"}
      justifyContent={"center"}
      align="flex-start"
      flexWrap={"wrap"}
      margin={5}
      gap={4}
    >
      {renderTodoCards(todoList, setTodos, onRemove)}
    </HStack>
  );
};

export default Todos;
