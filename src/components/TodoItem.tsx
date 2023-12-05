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
  Textarea,
} from "@chakra-ui/react";

import CustomCheckbox from "./CustomCheckBox";
import Todo from "../models/todo";
import { useState, useEffect } from "react";
import {
  CheckIcon,
  EditIcon,
  SmallCloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import TodoItemDetails from "./TodoItemDetails";

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
  const [showDetails, setShowDetails] = useState(false);

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
    <Card w={250} h={"auto"} bg={cardBgColor} borderColor={cardBorderColor}>
      <CardHeader p={0} py={2}>
        <HStack
          key={item.id}
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
          <IconButton
            color={textColor}
            size={"sm"}
            variant={"ghost"}
            aria-label="show details"
            icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={toggleShowDetails}
          />
        </HStack>
      </CardHeader>

      <CardBody>
        {editingItem ? (
          <>
            <Textarea
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
          <Text
            fontSize={"sm"}
            maxW="200px"
            overflowWrap="break-word"
            textDecoration={
              checkedItems.includes(item.id) ? "line-through" : "none"
            }
          >
            {item.text}
          </Text>
        )}
        {showDetails && <TodoItemDetails />}
      </CardBody>

      <CardFooter alignItems={"flex-end"}>
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
