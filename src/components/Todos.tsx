import { useState, useEffect } from "react";
import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  HStack,
  Tooltip,
  Flex,
  Input,
  Button,
  ButtonGroup,
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
  const editedList = JSON.parse(localStorage.getItem("editingItem") as string);

  const [checkedItems, setCheckedItems] = useState<string[]>(checkedList || []);
  const [editingItem, setEditingItem] = useState<string>(editedList || "");

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems, editingItem]);

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) => {
      const isChecked = prevChecked.includes(itemId);
      if (!isChecked) {
        const todoIndex = items.findIndex((todo) => todo.id === itemId);
        if (todoIndex !== -1) {
          const newTodos = items.slice();
          newTodos.splice(todoIndex, 1);
          setItems(newTodos);
          onRemove(itemId);
          setEditingItem("");
        }
      }
      return isChecked
        ? prevChecked.filter((id) => id !== itemId)
        : [...prevChecked, itemId];
    });
  };

  const startEditing = (itemId: string): void => {
    setEditingItem(itemId);
  };

  const saveEditing = (itemId: string, newText: string): boolean => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      )
    );
    setEditingItem("");
    return true;
  };

  const cancelEditing = () => {
    setEditingItem("");
  };

  return (
    <Flex justifyContent="center" minWidth={"fit-content"}>
      <Card maxW={"xs"}>
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
              <Stack key={item.id} mb={4}>
                <Box>
                  <HStack alignItems={"flex-start"}>
                    <CustomCheckbox
                      isChecked={checkedItems.includes(item.id)}
                      onChange={() => toggleCheckbox(item.id)}
                    />

                    <Tooltip
                      placement="auto-start"
                      label={`Added at: ${new Date(
                        item.timestamp
                      ).toLocaleString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "numeric",
                      })}`}
                    >
                      {editingItem && editingItem === item.id ? (
                        <>
                          <Input
                            defaultValue={item.text}
                            onBlur={(e) =>
                              saveEditing(item.id, e.currentTarget.value)
                            }
                            autoFocus
                          />
                          <ButtonGroup>
                            <Button
                              size="xs"
                              onClick={() => saveEditing(item.id, item.text)}
                            >
                              ok
                            </Button>
                            <Button size="xs" onClick={cancelEditing}>
                              x
                            </Button>
                          </ButtonGroup>
                        </>
                      ) : (
                        <>
                          <Text
                            maxW="200px"
                            overflowWrap="break-word"
                            textDecoration={
                              checkedItems.includes(item.id)
                                ? "line-through"
                                : "none"
                            }
                          >
                            {item.text}
                          </Text>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              startEditing(item.id);
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </Tooltip>
                  </HStack>
                </Box>
              </Stack>
            ))
          )}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Todos;
