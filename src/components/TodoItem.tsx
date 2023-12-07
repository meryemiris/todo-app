import {
  Text,
  HStack,
  Tooltip,
  ButtonGroup,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
  Box,
  Input,
} from "@chakra-ui/react";

import CustomCheckbox from "../utils/CustomCheckBox";
import Todo from "../models/todo";
import { useState, useEffect } from "react";
import {
  CheckIcon,
  EditIcon,
  SmallCloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import Tasks from "./Tasks";

interface TodoItemProps {
  todo: Todo;
  todoList: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemove: (itemID: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  todoList,
  setTodos,
  onRemove,
}: TodoItemProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const storedCheckedItems = JSON.parse(
      localStorage.getItem("checked") || "[]"
    );
    setCheckedItems(storedCheckedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) => {
      const isChecked = prevChecked.includes(itemId);
      if (!isChecked) {
        const todoIndex = todoList.findIndex((todo) => todo.id === itemId);
        if (todoIndex !== -1) {
          const newTodos = todoList.slice();
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

  function toggleShowDetails() {
    setShowDetails(!showDetails);
  }

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

  const cardBgColor = useColorModeValue("yellow.100", "gray.800");
  const cardBorderColor = useColorModeValue("green.100", "gray.600");
  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("purple.100", "#4B0082");
  const todoBorderColor = useColorModeValue("purple.100", "#4B0082");

  return (
    <Card w={"100%"} bg={cardBgColor} borderColor={cardBorderColor}>
      <CardHeader p={0} py={2}>
        <HStack
          key={todo.id}
          bg={todoBgColor}
          color={textColor}
          border={"2px"}
          borderColor={todoBorderColor}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {editingItem ? (
            <>
              <Input
                size="sm"
                variant="flushed"
                defaultValue={todo.text}
                onBlur={(e) => saveEditing(todo.id, e.currentTarget.value)}
                autoFocus
              />

              <ButtonGroup size={"xs"}>
                <IconButton
                  aria-label="Save todo"
                  color={textColor}
                  icon={<CheckIcon />}
                  onClick={() => saveEditing(todo.id, todo.text)}
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
              <CustomCheckbox
                isChecked={checkedItems.includes(todo.id)}
                onChange={() => toggleCheckbox(todo.id)}
              />
              <Text
                fontSize={"sm"}
                maxW="200px"
                overflowWrap="break-word"
                textDecoration={
                  checkedItems.includes(todo.id) ? "line-through" : "none"
                }
              >
                {todo.text.toUpperCase()}
              </Text>
            </>
          )}

          <Box>
            <Tooltip label="Edit" openDelay={500}>
              <IconButton
                color={textColor}
                size={"xs"}
                variant={"ghost"}
                aria-label="Edit todo"
                icon={<EditIcon />}
                onClick={(event) => {
                  event.preventDefault();
                  startEditing(todo.id);
                }}
              />
            </Tooltip>
            <IconButton
              color={textColor}
              size={"sm"}
              variant={"ghost"}
              aria-label="show details"
              icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
              onClick={toggleShowDetails}
            />
          </Box>
        </HStack>
      </CardHeader>

      {showDetails && (
        <CardBody>
          <Tasks initialTasks={todo.tasks} todoId={todo.id} />
        </CardBody>
      )}

      <CardFooter alignItems={"flex-end"}>
        <Text textColor={"gray.500"} fontSize={"xs"}>{`Added at: ${new Date(
          todo.timestamp
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
