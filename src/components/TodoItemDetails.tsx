import {
  FormControl,
  IconButton,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

interface TodoDetailsProps {
  todoId: string;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({
  todoId,
}: TodoDetailsProps) => {
  const initialDetails = JSON.parse(
    localStorage.getItem("detailsText") || "{}"
  );
  const [detailsText, setDetailsText] = useState<string>(
    initialDetails[todoId] || ""
  );

  useEffect(() => {
    const storedDetails = JSON.parse(
      localStorage.getItem("detailsText") || "{}"
    );
    setDetailsText(storedDetails[todoId] || "");
  }, [todoId]);

  useEffect(() => {
    const storedDetails = JSON.parse(
      localStorage.getItem("detailsText") || "{}"
    );
    localStorage.setItem(
      "detailsText",
      JSON.stringify({ ...storedDetails, [todoId]: detailsText })
    );
  }, [detailsText, todoId]);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const details = data.get("text") as string;

    setDetailsText(details);
  }

  return (
    <>
      {detailsText === "" ? (
        <form onSubmit={submitHandler}>
          <FormControl id="text" flex="1">
            <Input
              placeholder="Enter details here..."
              _placeholder={{
                fontSize: "sm",
              }}
              focusBorderColor="pink.400"
              borderRadius="md"
              required
              name="text"
            />
            <IconButton
              size={"sm"}
              aria-label="add todo details"
              icon={<AddIcon />}
              type="submit"
            />
          </FormControl>
        </form>
      ) : (
        <List>
          <ListItem>{detailsText}</ListItem>
        </List>
      )}
    </>
  );
};

export default TodoDetails;
