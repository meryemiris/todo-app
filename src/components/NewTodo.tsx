import React from "react";
import {
  Input,
  Stack,
  FormControl,
  useColorModeValue,
  IconButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Todo from "../models/todo";

interface NewTodoProps {
  todoList: Todo[];
  onAdd: (text: string, timestamp: number) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAdd, todoList }: NewTodoProps) => {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const timestamp = Date.now();

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
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 1, md: 2 }}
        alignItems="center"
        display={"flex"}
      >
        <Button
          colorScheme="pink"
          alignSelf={{ base: "center", md: "flex-start" }}
          w={{ base: "100%", sm: "auto" }}
          boxShadow={boxShadow}
        >
          <Box fontSize="2xl" role="img" aria-label="dice">
            🎲
          </Box>
        </Button>
        <FormControl id="text" flex="1">
          <Input
            mr={10}
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
            borderRadius="md"
            required
            name="text"
            boxShadow={boxShadow}
          />
        </FormControl>

        <IconButton
          aria-label="add todo"
          icon={<AddIcon />}
          type="submit"
          colorScheme="pink"
          borderRadius="md"
          alignSelf={{ base: "center", md: "flex-start" }}
          w={{ base: "100%", sm: "auto" }}
          boxShadow={boxShadow}
        />
      </Stack>
    </form>
  );
};

export default NewTodo;
