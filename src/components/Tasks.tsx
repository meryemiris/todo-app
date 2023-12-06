import React, { useState, useEffect } from "react";
import {
  VStack,
  Textarea,
  Button,
  ListItem,
  List,
  Input,
} from "@chakra-ui/react";

interface Task {
  id: string;
  text: string;
  todoId: string;
}

interface TasksProps {
  initialTasks: Task[];
  todoId: string;
}

const Tasks: React.FC<TasksProps> = ({ initialTasks, todoId }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(`tasks_${todoId}`, JSON.stringify(tasks));
  }, [tasks, todoId]);

  const addTaskHandler = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        id: new Date().toISOString(),
        text: newTaskText,
        todoId: todoId,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText("");
    }
  };

  const editTaskHandler = (taskId: string, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const removeTaskHandler = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const saveTaskHandler = (taskId: string) => {
    // You can add any additional logic you need before saving the task
    console.log(`Task with ID ${taskId} saved.`);
  };

  return (
    <VStack>
      <Textarea
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Add new task"
      />
      <Button onClick={addTaskHandler}>Add Task</Button>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Input
              value={task.text}
              onChange={(e) => editTaskHandler(task.id, e.target.value)}
            />
            <Button onClick={() => saveTaskHandler(task.id)}>Save</Button>
            <Button onClick={() => removeTaskHandler(task.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Tasks;
