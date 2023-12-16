import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import TodoCardHeader from "./TodoCardHeader";
import Tasks from "./Tasks";
import TimeAgo from "./TimeAgo";
import TodosModel from "../models/todo";

interface TodoCardProps {
  todo: TodosModel;
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

function GetCardStyles() {
  const cardBgColor = useColorModeValue("yellow.100", "gray.800");
  const cardBorderColor = useColorModeValue("green.100", "gray.600");
  const cardBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );

  return {
    bg: cardBgColor,
    borderColor: cardBorderColor,
    boxShadow: cardBoxShadow,
  };
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  todoList,
  setTodos,
  onRemove,
}: TodoCardProps) => {
  const cardStyles = GetCardStyles();

  return (
    <Card key={todo.id} {...cardStyles}>
      <CardHeader p={0} py={2}>
        <TodoCardHeader
          todoList={todoList}
          setTodos={setTodos}
          onRemove={onRemove}
          todo={todo}
        />
      </CardHeader>

      <CardBody pt={0}>
        <Tasks initialTasks={todo.tasks} todoId={todo.id} setTodos={setTodos} />
      </CardBody>

      <CardFooter py={2} pl={3} alignItems={"flex-end"}>
        <TimeAgo timestamp={todo.timestamp} />
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
