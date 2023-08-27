import React, { useState } from "react";

import Todo from "../models/todo";

import styles from "./Todos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TodosProps {
  items: Todo[];
}

const Todos: React.FC<TodosProps> = ({ items }: TodosProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const deleteHandler = (itemID: string) => (event: React.MouseEvent) => {
    event.preventDefault();

    const todo = event.currentTarget.parentElement?.parentElement;
    if (todo) {
      todo.remove();
    }
    console.log("delete todo with id:", itemID);
  };

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(itemId)
        ? prevChecked.filter((id) => id !== itemId)
        : [...prevChecked, itemId]
    );
  };

  const checkStyle = (itemId: string) =>
    checkedItems.includes(itemId) ? styles.checked : styles.check;

  const textStyle = (itemId: string) =>
    checkedItems.includes(itemId) ? styles.checkedItem : styles.text;

  return (
    <>
      <div className={styles.container}>
        <header>TODO LIST</header>
        <ul className={styles.todos}>
          {items.map((item) => (
            <li key={item.id} className={styles.todo}>
              <div
                className={checkStyle(item.id)}
                onClick={() => toggleCheckbox(item.id)}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className={checkStyle(item.id)}
                />
              </div>

              <div>
                <button
                  className={styles.deleteButton}
                  onClick={(event: React.MouseEvent) =>
                    deleteHandler(item.id)(event)
                  }
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={styles.deleteIcon}
                  />
                </button>
              </div>

              <div>
                <p className={textStyle(item.id)}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
