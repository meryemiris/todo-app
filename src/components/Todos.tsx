import { useState, useEffect } from "react";
import {
  Button,
  Text,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

import NewTodo from "./NewTodo";
import Todo from "../models/todo";
import CustomCheckbox from "./CustomCheckBox";

interface TodosProps {
  items: Todo[];
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemove: (itemID: string) => void;
  onAdd: (itemID: string, timestamp: number) => void;
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
        {items.length === 0 ? (
          <Text as="em" alignItems={"center"}>
            One Task at a Time!
          </Text>
        ) : (
          items.map((item) => (
            <Stack mb={4}>
              <Box key={item.id}>
                <HStack>
                  <CustomCheckbox
                    isChecked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheckbox(item.id)}
                  />

                  <Tooltip
                    placement="auto-start"
                    label={`Added at: ${new Date(item.timestamp).toLocaleString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "numeric",
                      }
                    )}`}
                  >
                    <Text
                      textDecoration={
                        checkedItems.includes(item.id) ? "line-through" : "none"
                      }
                    >
                      {item.text}
                    </Text>
                  </Tooltip>

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
          ))
        )}
      </CardBody>
    </Card>
  );
};

export default Todos;
