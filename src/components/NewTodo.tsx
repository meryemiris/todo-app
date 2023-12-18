import TodosModel from "../models/todo";
import {
  Input,
  FormControl,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface NewTodoProps {
  todoList: TodosModel[];
  onAdd: (text: string, timestamp: Date) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAdd, todoList }) => {
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

  const textColor = useColorModeValue("gray.900", "white");
  const bgColor = useColorModeValue("#f8edeb", "#343a40");

  return (
    <form onSubmit={submitHandler}>
      <FormControl>
        <InputGroup>
          <Input
            color={textColor}
            placeholder={
              todoList && todoList.length > 0
                ? "Enter your todo here..."
                : "Add First Todo"
            }
            _placeholder={{
              fontSize: "sm",
              color: textColor,
            }}
            focusBorderColor="pink.400"
            name="text"
            variant={"outline"}
            bgColor={bgColor}
            boxShadow={boxShadow}
            borderRadius="full"
            required
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
