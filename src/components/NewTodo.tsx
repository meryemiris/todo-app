import React from "react";
import {
  Input,
  FormControl,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import TodosModel from "../models/todo";
import { AddIcon } from "@chakra-ui/icons";

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
      <FormControl minW={"100%"}>
        <InputGroup ml={1}>
          <Input
            w={"100%"}
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
            variant={"outline"}
            borderColor={useColorModeValue("purple.100", "#ee6c4d")}
            boxShadow={boxShadow}
            borderRadius="full"
          />
          <InputRightElement>
            <IconButton
              aria-label="add todo"
              type="submit"
              icon={<AddIcon />}
              variant={"ghost"}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default NewTodo;
