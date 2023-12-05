import {
  Text,
  HStack,
  Tooltip,
  ButtonGroup,
  IconButton,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";

import CustomCheckbox from "./CustomCheckBox";
import Todo from "../models/todo";
import { useState, useEffect } from "react";
import { CheckIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";

interface TodoItemProps {
  item: Todo;
  items: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemove: (itemID: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  items,
  setTodos,
  onRemove,
}: TodoItemProps) => {
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
          setTodos(newTodos);
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
    setTodos((prevItems) =>
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

  const cardBgColor = useColorModeValue("yellow.100", "gray.900");
  const cardBorderColor = useColorModeValue("green.100", "gray.600");
  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("purple.100", "purple.800");
  const todoBorderColor = useColorModeValue("purple.100", "purple.800");

  return (
    <Card w={250} h={"auto"} bg={cardBgColor} borderColor={cardBorderColor}>
      <CardHeader p={0} pt={3}>
        <HStack
          key={item.id}
          p={1}
          bg={todoBgColor}
          color={textColor}
          border={"2px"}
          borderColor={todoBorderColor}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <CustomCheckbox
            isChecked={checkedItems.includes(item.id)}
            onChange={() => toggleCheckbox(item.id)}
          />

          {editingItem ? (
            <>
              <Input
                size="sm"
                variant="flushed"
                defaultValue={item.text}
                onBlur={(e) => saveEditing(item.id, e.currentTarget.value)}
                autoFocus
              />

              <ButtonGroup size={"xs"}>
                <IconButton
                  aria-label="Save todo"
                  color={textColor}
                  icon={<CheckIcon />}
                  onClick={() => saveEditing(item.id, item.text)}
                />
                <IconButton
                  aria-label="Cancel editing todo"
                  color={textColor}
                  onClick={cancelEditing}
                  icon={<SmallCloseIcon />}
                />
              </ButtonGroup>
            </>
          ) : (
            <>
              <Text
                maxW="200px"
                overflowWrap="break-word"
                textDecoration={
                  checkedItems.includes(item.id) ? "line-through" : "none"
                }
              >
                {item.text}
              </Text>

              <Tooltip label="Edit" openDelay={500}>
                <IconButton
                  color={textColor}
                  size={"xs"}
                  variant={"ghost"}
                  aria-label="Edit todo"
                  icon={<EditIcon />}
                  onClick={(event) => {
                    event.preventDefault();
                    startEditing(item.id);
                  }}
                />
              </Tooltip>
            </>
          )}
        </HStack>
      </CardHeader>
      <CardBody>Details</CardBody>
      <CardFooter>
        <Text textColor={"gray.500"} fontSize={"xs"}>{`Added at: ${new Date(
          item.timestamp
        ).toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "numeric",
        })}`}</Text>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
