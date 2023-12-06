import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

import { Text, Grid, VStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "./Navbar";

interface TodosProps {
  todoList: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onAdd: (itemID: string, timestamp: number) => void;
  onEdit: (itemID: string, newText: string) => void;
  onRemove: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  todoList,
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
    return todoList.length === 0 ? (
      <Text as="em" alignItems="center">
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
    );
  }

  return (
    <VStack>
      <Navbar>
        <NewTodo onAdd={onAdd} todoList={todoList} />
      </Navbar>
      <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={6}>
        <TodoList />
      </Grid>
    </VStack>
  );
};

export default Todos;
