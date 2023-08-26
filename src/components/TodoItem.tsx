import React, { useState } from "react";
import styles from "./TodoItem.module.css";
import Todo from "../models/todo";
import EditTodo from "./EditTodo";

interface TodoItemProps {
  items: Todo[];
  onShow: () => void;
}

const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>(props.items);

  function showEditHandler() {
    setIsEdit(true);
  }

  const editTodoHandler = (editedText: string, editedStatus: string) => {
    if (editedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editedTodo.id
            ? { ...todo, text: editedText, status: editedStatus }
            : todo
        )
      );
      setEditedTodo(null);
    }
  };
  console.log(todos); /// noo

  const deleteHandler =
    (itemID: string) => (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();

      const listItem = event.currentTarget.parentElement?.parentElement;
      if (listItem) {
        listItem.remove();
      }

      console.log(itemID);
    };

  return (
    <>
      {isEdit && editedTodo && (
        <EditTodo
          initialText={editedTodo.text}
          initialStatus={editedTodo.status}
          onEdit={editTodoHandler}
        />
      )}
      <ul className={styles.list}>
        {props.items.map((item) => (
          <li className={styles.item} key={item.id}>
            <div>
              <input className={styles.checkbox} type="checkbox"></input>
              {item.status}

              {item.text}
            </div>

            <div>
              <button onClick={showEditHandler} className={styles.itemButton}>
                edit
              </button>
              <button
                className={styles.itemButton}
                onClick={(event: React.MouseEvent<Element, MouseEvent>) =>
                  deleteHandler(item.id)(event)
                }
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoItem;
