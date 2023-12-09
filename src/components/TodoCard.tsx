import TodoCardHeader from "./TodoCardHeader";
import Tasks from "./Tasks";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import TimeAgo from "./TimeAgo";
import TodosModel from "../models/todo";

interface TodoItemProps {
  todo: TodosModel;
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  todoList,
  setTodos,
  onRemove,
}: TodoItemProps) => {
  const cardBgColor = useColorModeValue("yellow.100", "gray.800");
  const cardBorderColor = useColorModeValue("green.100", "gray.600");
  const cardBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );

  return (
    <Card
      key={todo.id}
      bg={cardBgColor}
      borderColor={cardBorderColor}
      boxShadow={cardBoxShadow}
    >
      <CardHeader p={0} py={2}>
        <TodoCardHeader
          todoList={todoList}
          setTodos={setTodos}
          onRemove={onRemove}
          todo={todo}
        />
      </CardHeader>

      <CardBody pt={0}>
        <Tasks initialTasks={todo.tasks} todoId={todo.id} />
      </CardBody>

      <CardFooter alignItems={"flex-end"}>
        <TimeAgo timestamp={todo.timestamp} />
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
