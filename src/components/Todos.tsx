import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";

import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

interface TodosProps {
  items: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onAdd: (itemID: string, timestamp: number) => void;
  onRemove: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  items,
  onAdd,
  setTodos,
  onRemove,
}: TodosProps) => {
  const TodoList = () => {
    if (items.length === 0) {
      return (
        <Text as="em" alignItems="center">
          One Task at a Time!
        </Text>
      );
    }

    return items.map((item) => (
      <TodoItem
        key={item.id}
        item={item}
        items={items}
        setTodos={setTodos}
        onRemove={onRemove}
      />
    ));
  };

  return (
    <Flex justifyContent="center" minWidth={"fit-content"}>
      <Card width={"fit-content"}>
        <CardHeader>
          <NewTodo onAdd={onAdd} items={items} />
        </CardHeader>

        <CardBody>{TodoList()}</CardBody>
      </Card>
    </Flex>
  );
};

export default Todos;
