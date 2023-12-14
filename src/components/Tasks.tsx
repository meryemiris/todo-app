import { useState, useEffect, useRef } from "react";

import TasksModel from "../models/task";
import TodosModel from "../models/todo";
import CustomCheckbox from "../utils/CustomCheckBox";

import {
  Button,
  ListItem,
  HStack,
  List,
  Textarea,
  useColorModeValue,
  InputGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface TasksProps {
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  initialTasks: TasksModel[];
  todoId: string;
}

const Tasks: React.FC<TasksProps> = ({
  setTodos,
  initialTasks,
  todoId,
}: TasksProps) => {
  const [tasks, setTasks] = useState<TasksModel[]>(initialTasks);

  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isEditTask, setIsEditTask] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const storedCheckedItems = JSON.parse(
      localStorage.getItem("checked") || "[]"
    );
    setCheckedItems(storedCheckedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    const storedTasks = JSON.parse(
      localStorage.getItem(`tasks_${todoId}`) || "[]"
    );
    if (initialTasks.length > 0) {
      setTasks(initialTasks);
    } else {
      setTasks(storedTasks);
    }
  }, [initialTasks, todoId]);

  const addTaskHandler = () => {
    if (newTaskText.trim() !== "") {
      const newTask: TasksModel = {
        id: new Date().toISOString(),
        text: newTaskText,
        todoId: todoId,
      };

      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));

        return updatedTasks;
      });

      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, tasks: [...todo.tasks, newTask] }
            : todo
        );
        return updatedTodos;
      });

      setNewTaskText("");
    } else {
      console.log("Task text cannot be empty.");
    }
    setIsNewTask(true);
  };

  const removeTaskHandler = (taskId: string) => {
    setCheckedItems((prevChecked) => {
      const isChecked = prevChecked.includes(taskId);

      if (isChecked) {
        return prevChecked.filter((id) => id !== taskId);
      } else {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          const newTasks = tasks.slice();

          newTasks.splice(taskIndex, 1);
          setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
            localStorage.setItem(
              `tasks_${todoId}`,
              JSON.stringify(updatedTasks)
            );
            return updatedTasks;
          });
          setIsEditTask(false);
        }

        return [...prevChecked, taskId];
      }
    });
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, tasks: todo.tasks.filter((task) => task.id !== taskId) }
          : todo
      );
      return updatedTodos;
    });
  };

  const editTaskHandler = (taskId: string, newText: string) => {
    setIsEditTask(true);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const saveTaskHandler = (taskId: string, newText: string) => {
    if (newText.length > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        );
        localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));

        return updatedTasks;
      });
    } else removeTaskHandler(taskId);
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tasks: todo.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : todo
      );
      return updatedTodos;
    });
    setIsNewTask(false);
    setIsEditTask(false);
  };

  const taskColor = useColorModeValue("yellow.50", "gray.600");
  const textColor = useColorModeValue("gray.900", "white");

  console.log(textColor);

  return (
    <List width={"100%"}>
      {tasks.map((task) => (
        <ListItem p={2} mt={2} bg={taskColor} borderRadius={5} key={task.id}>
          <HStack align={"flex-start"}>
            <CustomCheckbox
              isChecked={checkedItems.includes(task.id)}
              onChange={() => removeTaskHandler(task.id)}
            />

            <Textarea
              color={textColor}
              isRequired
              pt={0}
              rows={2}
              cols={20}
              overflow={isEditTask ? "hidden" : "unset"}
              variant={isEditTask ? "flushed" : "unstyled"}
              id={task.id}
              name="text"
              value={task.text}
              onChange={(e) => editTaskHandler(task.id, e.target.value)}
            />
            {isEditTask && (
              <Button
                color={textColor}
                onClick={() => saveTaskHandler(task.id, task.text)}
              >
                save
              </Button>
            )}
          </HStack>
        </ListItem>
      ))}
      {(isNewTask || !isEditTask) && (
        <InputGroup mt={5} alignItems={"flex-end"}>
          <Textarea
            color={textColor}
            ref={textAreaRef}
            overflow={"hidden"}
            variant={"flushed"}
            value={newTaskText}
            placeholder={
              tasks.length > 0
                ? "Add another task..."
                : "No tasks yet, add a new one..."
            }
            _placeholder={{
              textColor: textColor,
              fontSize: "sm",
            }}
            name="newTaskText"
            rows={2}
            cols={20}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <Button
            aria-label="add new task"
            color={textColor}
            fontSize={"xs"}
            variant={"ghost"}
            onClick={() => {
              addTaskHandler();
              textAreaRef.current?.focus();
            }}
            leftIcon={<AddIcon />}
          >
            add
          </Button>
        </InputGroup>
      )}
    </List>
  );
};

export default Tasks;
