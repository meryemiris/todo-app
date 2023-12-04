import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

import { Text, Grid, VStack } from "@chakra-ui/react";

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
    <VStack>
      <NewTodo onAdd={onAdd} items={items} />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <TodoList />
      </Grid>
    </VStack>
  );
};

export default Todos;
