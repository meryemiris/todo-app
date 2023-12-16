import React from "react";
import {
  ListItem,
  HStack,
  Textarea,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import CustomCheckbox from "../utils/CustomCheckBox";
import TasksModel from "../models/task";
import { CheckIcon } from "@chakra-ui/icons";

interface TaskItemProps {
  task: TasksModel;
  isEditing: boolean;
  isChecked: boolean;
  onRemove: (taskId: string) => void;
  onEdit: (taskId: string, newText: string) => void;
  onSave: (taskId: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isChecked,
  onRemove,
  onEdit,
  onSave,
  isEditing,
}: TaskItemProps) => {
  const taskColor = useColorModeValue("#F8EDEB", "#212529");
  const taskBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <ListItem
      boxShadow={taskBoxShadow}
      p={2}
      mt={2}
      bg={taskColor}
      borderRadius={5}
    >
      <HStack align={"flex-start"}>
        <CustomCheckbox
          isChecked={isChecked}
          onChange={() => onRemove(task.id)}
        />

        <Textarea
          value={task.text}
          color={textColor}
          pt={0}
          rows={2}
          cols={20}
          variant="unstyled"
          overflow="hidden"
          onChange={(e) => onEdit(task.id, e.target.value)}
          isRequired
        />
        {isEditing && (
          <IconButton
            borderRadius="full"
            aria-label="save task"
            icon={<CheckIcon />}
            variant={"ghost"}
            color={textColor}
            onClick={() => onSave(task.id, task.text)}
          />
        )}
      </HStack>
    </ListItem>
  );
};

export default TaskItem;
