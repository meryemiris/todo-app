import React from "react";
import {
  Input,
  FormControl,
  useColorModeValue,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TodosModel from "../models/todo";

interface NewTodoProps {
  todoList: TodosModel[];
  onAdd: (text: string, timestamp: Date) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAdd, todoList }: NewTodoProps) => {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currDate = Date.now();
    const timestamp = new Date(currDate);

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;

    onAdd(todoText, timestamp);

    event.currentTarget.reset();
  }

  const boxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );

  return (
    <form onSubmit={submitHandler}>
      <FormControl w={"100%"}>
        <InputGroup width={"100%"}>
          <Input
            mr={1}
            bg={useColorModeValue("purple.100", "#4B0082")}
            color={useColorModeValue("gray.900", "white")}
            placeholder={
              todoList && todoList.length > 0
                ? "Enter your todo here..."
                : "Add First Todo"
            }
            _placeholder={{
              fontSize: "sm",
              color: useColorModeValue("gray.900", "white"),
            }}
            focusBorderColor="pink.400"
            required
            name="text"
            boxShadow={boxShadow}
          />
          <IconButton
            aria-label="add todo"
            icon={<AddIcon />}
            type="submit"
            colorScheme="pink"
            borderRadius="full"
            boxShadow={boxShadow}
          />
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default NewTodo;
