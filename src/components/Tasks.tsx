import { useState, useEffect } from "react";

import TasksModel from "../models/task";
import TodosModel from "../models/todo";
import CustomCheckbox from "../utils/CustomCheckBox";

import { Button, ListItem, HStack, List, Textarea } from "@chakra-ui/react";
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

  const [timers, setTimers] = useState<Record<string, number>>({});

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

  const toggleCheckbox = (taskId: string) => {
    setCheckedItems((prevChecked) => {
      const isChecked = prevChecked.includes(taskId);

      if (isChecked) {
        return prevChecked.filter((id) => id !== taskId);
      } else {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          const newTasks = tasks.slice();
          const delayTime = 500;

          const timeoutId = setTimeout(() => {
            newTasks.splice(taskIndex, 1);
            setTasks((prevTasks) => {
              const updatedTasks = prevTasks.filter(
                (task) => task.id !== taskId
              );
              localStorage.setItem(
                `tasks_${todoId}`,
                JSON.stringify(updatedTasks)
              );
              return updatedTasks;
            });
            setIsEditTask(false);
          }, delayTime);

          setTimers((prevTimers) => ({ ...prevTimers, [taskId]: timeoutId }));
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

  useEffect(() => {
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, [timers]);

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
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      localStorage.setItem(`tasks_${todoId}`, JSON.stringify(updatedTasks));
      console.log(updatedTasks);
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
    setIsNewTask(false);
    setIsEditTask(false);
  };

  return (
    <List width={"100%"}>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <HStack align={"flex-start"}>
            <CustomCheckbox
              isChecked={checkedItems.includes(task.id)}
              onChange={() => toggleCheckbox(task.id)}
            />

            <Textarea
              textDecoration={
                checkedItems.includes(task.id) ? "line-through" : "none"
              }
              overflow={isEditTask ? "hidden" : "unset"}
              variant={isEditTask ? "flushed" : "unstyled"}
              id={task.id}
              name="text"
              value={task.text}
              onChange={(e) => editTaskHandler(task.id, e.target.value)}
            />
            {isEditTask && (
              <Button onClick={() => saveTaskHandler(task.id, task.text)}>
                save
              </Button>
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
