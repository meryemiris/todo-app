import React, { useState } from "react";

import Todo from "../models/todo";

import styles from "./Todos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className={styles.container}>
      <header>TODO LIST</header>
      <ul className={styles.list}>
        {items.map((item) => (
          <li className={styles.item} key={item.id}>
            <div>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={checkedItems.includes(item.id)}
                onChange={() => toggleCheckbox(item.id)}
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
              <p
                style={{
                  textDecoration: checkedItems.includes(item.id)
                    ? "line-through"
                    : "none",
                }}
              >
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
