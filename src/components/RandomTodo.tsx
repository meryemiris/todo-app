import TodosModel from "../models/todo";

import { useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

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

import { GiCardRandom } from "react-icons/gi";

const MotionBox = motion(Box);

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

const getRandomMotivationalMessage = () => {
  const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
  return motivationalMessages[randomIndex];
};

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

  const modalHeaderBgColor = useColorModeValue("#f9dcc4", "#ee6c4d");
  const modalContentBgColor = useColorModeValue("#f8edeb", "#343a40");
  const modalBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  const textColor = useColorModeValue("gray.900", "white");
  const motivationTextColor = useColorModeValue("gray.900", "gray.300");
  const iconColor = "#ee6c4d";

  const renderTasks = (
    <UnorderedList>
      {randomTodo?.tasks.map(({ text }, index) => (
        <ListItem key={index}>{text}</ListItem>
      ))}
    </UnorderedList>
  );

  return (
    <>
      <Tooltip
        openDelay={300}
        placement="auto-end"
        label={"Random todo, decide for me!"}
      >
        <IconButton
          aria-label="random todo"
          h={"100%"}
          color={iconColor}
          icon={<GiCardRandom size={"3rem"} />}
          variant="ghost"
          borderRadius="full"
          onClick={() => {
            handleRandomClick();
            onOpen();
          }}
          size={"xl"}
        ></IconButton>
      </Tooltip>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropBlur={"1px"} />
        <MotionBox
          as={ModalContent}
          bg={modalContentBgColor}
          color={textColor}
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 40 }}
        >
          <ModalHeader bg={modalHeaderBgColor} boxShadow={modalBoxShadow}>
            {randomTodo?.text.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton borderRadius={"full"} />

          <ModalBody>{renderTasks}</ModalBody>

          <ModalFooter pb={1} justifyContent={"space-between"}>
            <Text color={motivationTextColor} fontSize={"xs"}>
              {getRandomMotivationalMessage()}
            </Text>

            <IconButton
              aria-label="generate new random todo"
              icon={<RepeatIcon />}
              variant={"ghost"}
              borderRadius="full"
              m={2}
              color={iconColor}
              onClick={handleRandomClick}
            />
          </ModalFooter>
        </MotionBox>
      </Modal>
    </>
  );
};

export default RandomTodo;
