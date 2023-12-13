import { useState, useEffect } from "react";
import {
  Button,
  ListItem,
  HStack,
  IconButton,
  List,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import TasksModel from "../models/task";
import TodosModel from "../models/todo";

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
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
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
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

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

    setIsEditTask(true);
    setIsNewTask(false);
    setNewTaskText(newText);
  };

  const saveTaskHandler = (taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newTaskText } : task
      );
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setIsEditTask(false);
    setIsNewTask(true);
    setNewTaskText("");
  };

  return (
    <List width={"100%"}>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <HStack align={"flex-start"}>
            <IconButton
              size={"sm"}
              variant={"ghost"}
              icon={<DeleteIcon />}
              aria-label="remove task"
              onClick={() => removeTaskHandler(task.id)}
            />

            <Textarea
              overflow={isEditTask ? "hidden" : "unset"}
              variant={isEditTask ? "flushed" : "unstyled"}
              id={task.id}
              name="text"
              value={task.text}
              onChange={(e) => editTaskHandler(task.id, e.target.value)}
            />
            {isEditTask && (
              <Button onClick={() => saveTaskHandler(task.id)}>save</Button>
            )}
          </HStack>
        </ListItem>
      ))}
      {(isNewTask || !isEditTask) && (
        <ListItem width={"100%"}>
          <Textarea
            variant={"flushed"}
            value={newTaskText}
            placeholder={
              tasks.length > 0
                ? "Add another task..."
                : "No tasks yet, add a new one..."
            }
            _placeholder={{
              fontSize: "sm",
              fontStyle: "italic",
            }}
            name="newTaskText"
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <Button
            fontSize={"sm"}
            variant={"ghost"}
            color={"gray.600"}
            onClick={addTaskHandler}
            leftIcon={<AddIcon />}
          >
            Add
          </Button>
        </ListItem>
      )}
    </List>
  );
};

export default Tasks;
