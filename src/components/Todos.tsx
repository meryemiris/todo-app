import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Text,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  HStack,
} from "@chakra-ui/react";
import NewTodo from "./NewTodo";
import Todo from "../models/todo";

interface TodosProps {
  items: Todo[];
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemove: (itemID: string) => void;
  onAdd: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  items,
  setItems,
  onRemove,
  onAdd,
}: TodosProps) => {
  const checkedList = JSON.parse(localStorage.getItem("checked") as string);
  const [checkedItems, setCheckedItems] = useState<string[]>(checkedList || []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(itemId)
        ? prevChecked.filter((id) => id !== itemId)
        : [...prevChecked, itemId]
    );
  };

  const deleteHandler = (itemID: string) => () => {
    const todoIndex = items.findIndex((todo) => todo.id === itemID);
    if (todoIndex !== -1) {
      const newTodos = items.slice();
      newTodos.splice(todoIndex, 1);
      setItems(newTodos);
      onRemove(itemID);
    }
  };

  return (
    <Card>
      <CardHeader>
        <NewTodo onAdd={onAdd} items={items} />
      </CardHeader>

      <CardBody>
        {items.map((item) => (
          <Stack mb={4}>
            <Box key={item.id}>
              <HStack>
                <Checkbox
                  size="lg"
                  isChecked={checkedItems.includes(item.id)}
                  onChange={() => toggleCheckbox(item.id)}
                />
                <Text
                  textDecoration={
                    checkedItems.includes(item.id) ? "line-through" : "none"
                  }
                >
                  {item.text}
                </Text>
                <Button
                  size="xs"
                  ml="auto"
                  colorScheme="red"
                  onClick={deleteHandler(item.id)}
                >
                  del
                </Button>
              </HStack>
            </Box>
          </Stack>
        ))}
      </CardBody>
    </Card>
  );
};

export default Todos;
