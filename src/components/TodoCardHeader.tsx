import { useEffect, useState } from "react";

import TodosModel from "../models/todo";

import CustomCheckbox from "../utils/CustomCheckBox";

import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  HStack,
  Heading,
  IconButton,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

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
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

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

          const newTimeoutId = setTimeout(() => {
            newTodos.splice(todoIndex, 1);
            setTodos(newTodos);
            onRemove(itemId);
            setEditingItem("");
          }, delayTime);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          setTimeoutId(newTimeoutId);
        }

        return [...prevChecked, itemId];
      }
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    };
  }, [timeoutId]);

  const startEditing = (itemId: string): void => {
    setEditingItem(itemId);
  };

  const saveEditing = (itemId: string, newText: string): void => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      )
    );
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
        <HStack justifyContent={"space-between"}>
          <Input
            variant="flushed"
            defaultValue={todo.text}
            onBlur={(e) => saveEditing(todo.id, e.currentTarget.value)}
            autoFocus
          />

          <IconButton
            size={"xs"}
            variant={"ghost"}
            aria-label="Save todo"
            color={textColor}
            icon={<CheckIcon />}
            onClick={() => saveEditing(todo.id, todo.text)}
          />
        </HStack>
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
        </>
      )}
    </HStack>
  );
};

export default TodoCardHeader;
