import {
  Box,
  Button,
  IconButton,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import TodosModel from "../models/todo";
import { useState } from "react";
import TasksModel from "../models/task";
import { RepeatIcon } from "@chakra-ui/icons";

interface RandomTodoProps {
  todoList: TodosModel[];
}

const RandomTodo: React.FC<RandomTodoProps> = ({ todoList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [randomTodo, setRandomTodo] = useState<TodosModel | null>(null);

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * todoList.length);
    setRandomTodo(todoList[randomIndex]);
  };

  const ModalBgColor = useColorModeValue("yellow.100", "gray.800");
  const ModalBorderColor = useColorModeValue("green.100", "gray.600");
  const ModalBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("purple.100", "#4B0082");

  return (
    <>
      <Button
        onClick={() => {
          handleRandomClick();
          onOpen();
        }}
        pl={1}
        colorScheme="pink"
        alignSelf={{ base: "center", md: "flex-start" }}
        w={{ base: "100%", sm: "auto" }}
      >
        <Box fontSize="2xl" role="img" aria-label="dice">
          🎲
        </Box>
        <Text fontSize={"sm"}> Give me something to do!</Text>
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          border={"solid 1px"}
          borderColor={ModalBorderColor}
          boxShadow={ModalBoxShadow}
          bg={ModalBgColor}
        >
          <ModalHeader bg={todoBgColor}>
            {randomTodo?.text.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              {randomTodo?.tasks.map((task: TasksModel, index) => (
                <ListItem color={textColor} key={index}>
                  {task.text}
                </ListItem>
              ))}
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <IconButton
              aria-label="generate new random todo"
              icon={<RepeatIcon />}
              size={"lg"}
              variant={"ghost"}
              m={3}
              onClick={handleRandomClick}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RandomTodo;
