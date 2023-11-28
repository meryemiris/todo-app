import React from "react";
import { Button, Input, FormControl, HStack } from "@chakra-ui/react";
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
      <HStack spacing={1} align="stretch">
        <FormControl id="text">
          <Input
            placeholder={
              items.length > 0 ? "Enter your todo here..." : "Add First Todo"
            }
            required
            name="text"
          />
        </FormControl>

        <Button padding={5} type="submit" colorScheme="pink">
          +
        </Button>
      </HStack>
    </form>
  );
};

export default NewTodo;
