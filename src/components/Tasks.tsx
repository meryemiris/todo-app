import React, { useState, useEffect } from "react";
import {
  Button,
  ListItem,
  Input,
  HStack,
  IconButton,
  List,
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
  initialTasks,
  todoId,
  setTodos,
}: TasksProps) => {
  const [tasks, setTasks] = useState<TasksModel[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isEditTask, setIsEditTask] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(
      localStorage.getItem(`tasks_${todoId}`) || "[]"
    );
    if (initialTasks.length > 0) {
      // If initialTasks is provided, use it
      setTasks(initialTasks);
    } else {
      // Otherwise, use the stored tasks from local storage
      setTasks(storedTasks);
    }
  }, [initialTasks, todoId]);

  const newTaskHandler = () => {
    setNewTaskText("");
  };

  const addTaskHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      // Ensure to update the tasks property in the current todo
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
  };

  const removeTaskHandler = (taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
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
    setIsEditTask(true);

    setNewTaskText(newText);
  };

  const saveTaskHandler = (
    taskId: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newTaskText } : task
      );
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setIsEditTask(false);
    setNewTaskText("");
  };

  return (
    <List width={"100%"}>
      <Button onClick={newTaskHandler} leftIcon={<AddIcon />}>
        New Task
      </Button>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <HStack>
            <IconButton
              size={"sm"}
              variant={"ghost"}
              icon={<DeleteIcon />}
              aria-label="remove task"
              onClick={() => removeTaskHandler(task.id)}
            />

            <form onSubmit={(e) => saveTaskHandler(task.id, e)}>
              <Input
                width={"100%"}
                variant={isEditTask ? "flushed" : "unstyled"}
                id={task.id}
                name="text"
                value={task.text}
                onChange={(e) => editTaskHandler(task.id, e.target.value)}
              />
            </form>
          </HStack>
        </ListItem>
      ))}
      <ListItem width={"100%"}>
        <form onSubmit={addTaskHandler}>
          <Input
            variant={"flushed"}
            value={newTaskText}
            placeholder="Add new task"
            name="newTaskText"
            onChange={(e) => setNewTaskText(e.target.value)}
          />
        </form>
      </ListItem>
    </List>
  );
};

export default Tasks;
