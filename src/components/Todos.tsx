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

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(itemId)
        ? prevChecked.filter((id) => id !== itemId)
        : [...prevChecked, itemId]
    );
  };

  const deleteHandler = (itemID: string) => (event: React.MouseEvent) => {
    event.preventDefault();

    const listItem = event.currentTarget.parentElement?.parentElement;
    if (listItem) {
      listItem.remove();
    }

    console.log(itemID);
  };

  const checkStyle = (itemId: string) =>
    checkedItems.includes(itemId) ? styles.checkedIcon : styles.checkIcon;

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
                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
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

{
  /* <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleCheckbox(item.id)}
                />
              </div> */
}
