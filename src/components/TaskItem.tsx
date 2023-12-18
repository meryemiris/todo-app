import {
  ListItem,
  Textarea,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import TasksModel from "../models/task";
import { CheckIcon } from "@chakra-ui/icons";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface TaskItemProps {
  task: TasksModel;
  editingId: string;

  onRemove: (taskId: string) => void;
  onEdit: (taskId: string, newText: string) => void;
  onSave: (taskId: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onRemove,
  onEdit,
  onSave,
  editingId,
}: TaskItemProps) => {
  const taskColor = useColorModeValue("#f8f9fa", "#212529");
  const taskBoxShadow = useColorModeValue(
    "2px 2px 2px 2px rgba(0, 0, 0, 0.6)",
    "0 0 0 transparent"
  );
  const textColor = useColorModeValue("gray.900", "white");
  const isTaskEditing = editingId === task.id;

  return (
    <ListItem
      display={"flex"}
      flexDirection={"row"}
      alignItems={"flex-start"}
      boxShadow={taskBoxShadow}
      bg={taskColor}
      borderRadius={5}
      mt={1}
    >
      {!isTaskEditing && (
        <IconButton
          color={"#ee6c4d"}
          aria-label="delete task"
          icon={<AiOutlineCheckCircle />}
          onClick={() => onRemove(task.id)}
          variant={"ghost"}
          borderRadius={"full"}
        />
      )}

      <Textarea
        fontSize={"sm"}
        value={task.text}
        color={textColor}
        rows={2}
        cols={20}
        variant="unstyled"
        pl={1}
        onChange={(e) => onEdit(task.id, e.target.value)}
        isRequired
      />
      {isTaskEditing && (
        <IconButton
          borderRadius="full"
          aria-label="save task"
          icon={<CheckIcon />}
          variant={"ghost"}
          color={textColor}
          onClick={() => onSave(task.id, task.text)}
        />
      )}
    </ListItem>
  );
};

export default TaskItem;
