import React, { useState, useEffect, useRef } from "react";
import {
  List,
  InputGroup,
  Textarea,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TasksModel from "../models/task";
import TodosModel from "../models/todo";
import TaskItem from "./TaskItem";

interface TasksProps {
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  initialTasks: TasksModel[];
  todoId: string;
}

const Tasks: React.FC<TasksProps> = ({ setTodos, initialTasks, todoId }) => {
  const [tasks, setTasks] = useState<TasksModel[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isNewTask, setIsNewTask] = useState(false);

  const [editingId, setEditingId] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    localStorage.setItem(`tasks_${todoId}`, JSON.stringify(newTasks));

    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, tasks: newTasks } : todo
      );
      return updatedTodos;
    });
    setEditingId("");
  };

  const editTaskHandler = (taskId: string, newText: string) => {
    setEditingId(taskId);
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
    setEditingId("");
  };

  const textColor = useColorModeValue("gray.900", "white");

  return (
    <List width={"100%"}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onRemove={removeTaskHandler}
          onEdit={editTaskHandler}
          editingId={editingId}
          onSave={saveTaskHandler}
        />
      ))}
      {(isNewTask || editingId === "") && (
        <InputGroup mt={5} alignItems={"center"}>
          <Textarea
            alignContent={"flex-end"}
            focusBorderColor="#ee6c4d"
            value={newTaskText}
            color={textColor}
            name="newTaskText"
            ref={textAreaRef}
            overflow={"hidden"}
            variant={"flushed"}
            placeholder={
              tasks.length > 0
                ? "Add another task..."
                : "No tasks yet, add one..."
            }
            _placeholder={{
              textColor: textColor,
              fontSize: "xs",
            }}
            rows={2}
            cols={20}
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <IconButton
            aria-label="add new task"
            size={"xs"}
            borderRadius="full"
            color={"#ee6c4d"}
            fontSize={"xs"}
            variant={"ghost"}
            onClick={() => {
              addTaskHandler();
              textAreaRef.current?.focus();
            }}
            icon={<AddIcon />}
          />
        </InputGroup>
      )}
    </List>
  );
};

export default Tasks;
