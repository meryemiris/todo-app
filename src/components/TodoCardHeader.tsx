import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  HStack,
  Heading,
  IconButton,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomCheckbox from "../utils/CustomCheckBox";
import { useEffect, useState } from "react";

import TodosModel from "../models/todo";

interface TodoCardHeaderProps {
  todo: TodosModel;
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

const TodoCardHeader: React.FC<TodoCardHeaderProps> = ({
  todo,
  todoList,
  setTodos,
  onRemove,
}: TodoCardHeaderProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const [timers, setTimers] = useState<Record<string, number>>({});

  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("purple.100", "#4B0082");
  const todoBorderColor = useColorModeValue("purple.100", "#4B0082");

  useEffect(() => {
    const storedCheckedItems = JSON.parse(
      localStorage.getItem("checked") || "[]"
    );
    setCheckedItems(storedCheckedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleShowDetails = () => setShowDetails(!showDetails);

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) => {
      const isChecked = prevChecked.includes(itemId);

      if (isChecked) {
        return prevChecked.filter((id) => id !== itemId);
      } else {
        const todoIndex = todoList.findIndex((todo) => todo.id === itemId);

        if (todoIndex !== -1) {
          const newTodos = todoList.slice();
          const delayTime = 1000;

          if (timers[itemId]) {
            clearTimeout(timers[itemId]);
          }

          const timeoutId = setTimeout(() => {
            newTodos.splice(todoIndex, 1);
            setTodos(newTodos);
            onRemove(itemId);
            setEditingItem("");
          }, delayTime);

          setTimers((prevTimers) => ({ ...prevTimers, [itemId]: timeoutId }));
        }

        return [...prevChecked, itemId];
      }
    });
  };

  useEffect(() => {
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, [timers]);

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

  return (
    <HStack
      bg={todoBgColor}
      color={textColor}
      border={"2px"}
      borderColor={todoBorderColor}
      alignItems={"center"}
      justifyContent={"space-around"}
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
          <Heading
            fontSize={"sm"}
            maxW="200px"
            overflowWrap="break-word"
            textDecoration={
              checkedItems.includes(todo.id) ? "line-through" : "none"
            }
          >
            {todo.text.toUpperCase()}
          </Heading>
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
  );
};

export default TodoCardHeader;
