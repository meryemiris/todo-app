import { useEffect, useState } from "react";
import TodosModel from "../models/todo";

import {
  HStack,
  Heading,
  IconButton,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

interface TodoCardHeaderProps {
  todo: TodosModel;
  todoList: TodosModel[];
  onRemove: (itemID: string) => void;
  onEdit: (itemID: string, newText: string) => void;
}

function GetCardHeaderStyles() {
  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("#f9dcc4", "#ee6c4d");
  const cardBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  return {
    p: 2,
    bg: todoBgColor,
    color: textColor,
    boxShadow: cardBoxShadow,
  };
}

const TodoCardHeader: React.FC<TodoCardHeaderProps> = ({
  todo,
  todoList,

  onRemove,
  onEdit,
}: TodoCardHeaderProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string>("");
  const cardHeaderStyles = GetCardHeaderStyles();

  useEffect(() => {
    const storedCheckedItems = JSON.parse(
      localStorage.getItem("checked") || "[]"
    );
    setCheckedItems(storedCheckedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const deleteTodo = (itemId: string) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === itemId);

    if (todoIndex !== -1) {
      const newTodos = todoList.slice();
      newTodos.splice(todoIndex, 1);

      onRemove(itemId);
      setEditingItem("");
    }
  };

  const startEditing = (itemId: string): void => {
    setEditingItem(itemId);
  };
  const saveEditing = (itemId: string, newText: string): void => {
    onEdit(itemId, newText);
    setEditingItem("");
  };

  return (
    <HStack {...cardHeaderStyles} justifyContent={"space-around"}>
      {editingItem ? (
        <HStack justifyContent={"space-between"}>
          <Input
            variant="flushed"
            defaultValue={todo.text}
            onBlur={(e) => saveEditing(todo.id, e.currentTarget.value)}
            autoFocus
          />

          <IconButton
            borderRadius="full"
            variant={"ghost"}
            aria-label="Save todo"
            icon={<AiOutlineCheck />}
            onClick={() => saveEditing(todo.id, todo.text)}
          />
        </HStack>
      ) : (
        <>
          <IconButton
            aria-label="delete todo"
            icon={<AiOutlineDelete />}
            onClick={() => deleteTodo(todo.id)}
            borderRadius="full"
            variant={"ghost"}
          />
          <Heading
            fontSize={"sm"}
            maxW="200px"
            fontWeight={500}
            overflowWrap="break-word"
          >
            {todo.text.toUpperCase()}
          </Heading>
          <Tooltip label="Edit" openDelay={300}>
            <IconButton
              aria-label="Edit todo"
              icon={<AiOutlineEdit />}
              variant={"ghost"}
              borderRadius="full"
              onClick={() => {
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
