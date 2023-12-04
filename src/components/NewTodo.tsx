import React from "react";
import {
  Input,
  Stack,
  FormControl,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Todo from "../models/todo";

interface NewTodoProps {
  items: Todo[];
  onAdd: (text: string, timestamp: number) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAdd, items }: NewTodoProps) => {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const timestamp = Date.now();

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;

    onAdd(todoText, timestamp);

    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submitHandler}>
      <Stack
        w={250}
        mb={3}
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 1, md: 2 }}
      >
        <FormControl id="text" flex="1">
          <Input
            size={"sm"}
            bg={useColorModeValue("gray.100", "yellow.200")}
            color={useColorModeValue("gray.800", "black")}
            placeholder={
              items.length > 0 ? "Enter your todo here..." : "Add First Todo"
            }
            _placeholder={{
              fontSize: "sm",
              color: useColorModeValue("gray.800", "black"),
            }}
            focusBorderColor="pink.400"
            borderRadius="md"
            required
            name="text"
          />
        </FormControl>

        <IconButton
          size={"sm"}
          aria-label="add todo"
          icon={<AddIcon />}
          type="submit"
          colorScheme="pink"
          borderRadius="md"
          alignSelf={{ base: "center", md: "flex-start" }}
          w={{ base: "100%", sm: "auto" }}
        />
      </Stack>
    </form>
  );
};

export default NewTodo;
