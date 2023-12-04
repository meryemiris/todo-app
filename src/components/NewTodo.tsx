import React from "react";
import { Input, FormControl, HStack, IconButton } from "@chakra-ui/react";
import Todo from "../models/todo";
import { AddIcon } from "@chakra-ui/icons";

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
      <HStack spacing={1} align="stretch">
        <FormControl id="text">
          <Input
            bg="yellow.50"
            color={"gray.800"}
            placeholder={
              items.length > 0 ? "Enter your todo here..." : "Add First Todo"
            }
            focusBorderColor="pink.400"
            _placeholder={{ color: "gray.800", fontSize: "sm" }}
            required
            name="text"
          />
        </FormControl>

        <IconButton
          icon={<AddIcon />}
          aria-label="Add Todo"
          padding={5}
          type="submit"
          colorScheme="pink"
        />
      </HStack>
    </form>
  );
};

export default NewTodo;
