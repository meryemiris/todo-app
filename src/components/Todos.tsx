import { HStack } from "@chakra-ui/react";
import TodosModel from "../models/todo";
import TodoCard from "./TodoCard";

interface TodosProps {
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

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
      {todoList.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          todoList={todoList}
          setTodos={setTodos}
          onRemove={onRemove}
        />
      ))}
    </HStack>
  );
};

export default Todos;
