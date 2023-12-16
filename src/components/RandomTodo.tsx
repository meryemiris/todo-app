import {
  Box,
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
  Tooltip,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import TodosModel from "../models/todo";
import TasksModel from "../models/task";

import { GiCardRandom } from "react-icons/gi";

const MotionBox = motion(Box);

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
  const ModalBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  const textColor = useColorModeValue("gray.900", "white");
  const todoBgColor = useColorModeValue("purple.100", "#4B0082");

  const motivationalMessages = [
    "You've got this! 💪",
    "Stay focused and keep pushing forward. 🚀",
    "Every accomplishment starts with the decision to try. ✨",
    "Believe in yourself and all that you are. 🌟",
    "Dream big, work hard, stay focused. ⭐️",
    "The only way to achieve the impossible is to believe it is possible. 🌈",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. 🌌",
    "Your attitude determines your direction. 🌠",
    "Embrace the journey and don't forget to enjoy the view. 🏞️",
    "You are capable of more than you know. 🌻",
    "Keep going, you are making progress. 🏋️‍♂️",
    "Hard work beats talent when talent doesn't work hard. 🔥",
    "The future belongs to those who believe in the beauty of their dreams. 🌙",
  ];

  const iconColor = useColorModeValue("pink.500", "#4B0082");

  return (
    <>
      <Tooltip label={"Random todo, decide for me!"}>
        <IconButton
          h={"100%"}
          icon={<GiCardRandom size={"3rem"} />}
          aria-label="random todo"
          variant="ghost"
          _hover={{}}
          borderRadius="full"
          onClick={() => {
            handleRandomClick();
            onOpen();
          }}
          size={"xl"}
          color={iconColor}
        ></IconButton>
      </Tooltip>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <MotionBox
          as={ModalContent}
          border={"solid 1px"}
          boxShadow={ModalBoxShadow}
          bg={ModalBgColor}
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 40 }}
        >
          <ModalHeader bg={todoBgColor}>
            {randomTodo?.text.toUpperCase()}
          </ModalHeader>

          <ModalCloseButton borderRadius={"full"} />
          <ModalBody>
            <UnorderedList>
              {randomTodo?.tasks.map((task: TasksModel, index) => (
                <ListItem color={textColor} key={index}>
                  {task.text}
                </ListItem>
              ))}
            </UnorderedList>
          </ModalBody>

          <ModalFooter pb={1} justifyContent={"space-between"}>
            <Text fontSize={"xs"} color={textColor}>
              {
                motivationalMessages[
                  Math.floor(Math.random() * motivationalMessages.length)
                ]
              }
            </Text>

            <IconButton
              borderRadius="full"
              aria-label="generate new random todo"
              icon={<RepeatIcon />}
              size={"lg"}
              variant={"ghost"}
              m={3}
              onClick={handleRandomClick}
            />
          </ModalFooter>
        </MotionBox>
      </Modal>
    </>
  );
};

export default RandomTodo;
