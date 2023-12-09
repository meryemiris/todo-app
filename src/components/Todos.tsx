import React from "react";

import TodoItem from "./TodoCard";
import TodosModel from "../models/todo";

interface TodosProps {
  todoList: TodosModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodosModel[]>>;
  onRemove: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  todoList,
  setTodos,
  onRemove,
}: TodosProps) => {
  return todoList.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      todoList={todoList}
      setTodos={setTodos}
      onRemove={onRemove}
    />
  ));
};

export default Todos;
