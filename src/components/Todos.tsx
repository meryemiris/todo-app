import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

import { Text, Grid, VStack, useBreakpointValue } from "@chakra-ui/react";

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
  const columnCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });

  function TodoList() {
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
  }

  return (
    <VStack>
      <NewTodo onAdd={onAdd} items={items} />
      <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={6}>
        <TodoList />
      </Grid>
    </VStack>
  );
};

export default Todos;
