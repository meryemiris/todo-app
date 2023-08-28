import { useState, useEffect } from "react";
import Todo from "../models/todo";

import styles from "../styles/Todos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TodosProps {
  items: Todo[];
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemove: (itemID: string) => void;
}

const Todos: React.FC<TodosProps> = ({
  items,
  setItems,
  onRemove,
}: TodosProps) => {
  const checkedList = JSON.parse(localStorage.getItem("checked") as string);

  const [checkedItems, setCheckedItems] = useState<string[]>(checkedList || []);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(itemId)
        ? prevChecked.filter((id) => id !== itemId)
        : [...prevChecked, itemId]
    );
  };

  const deleteHandler = (itemID: string) => () => {
    const todoIndex = items.findIndex((todo) => todo.id === itemID);
    if (todoIndex !== -1) {
      const newTodos = items.slice();
      newTodos.splice(todoIndex, 1);
      setItems(newTodos);
      onRemove(itemID);
    }
  };

  const checkStyle = (itemId: string) =>
    checkedItems.includes(itemId) ? styles.checked : styles.check;

  const textStyle = (itemId: string) =>
    checkedItems.includes(itemId) ? styles.checkedTodo : styles.todoText;

  return (
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
            <p className={textStyle(item.id)}>{item.text}</p>
          </div>
          <div className={styles.delete}>
            <button
              className={styles.deleteButton}
              onClick={deleteHandler(item.id)}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={styles.deleteIcon}
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
