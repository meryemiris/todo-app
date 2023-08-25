import styles from "./Todos.module.css";
import { useState } from "react";
import Todo from "../models/todo";
import EditTodo from "./EditTodo";

interface TodosProps {
  items: Todo[];
  onShow: () => void;
  // onRemove: (itemID: string) => void;
}

// const DUMMY_TODOS = ["Learn React", "Practice", "Find a Job"];

const Todos: React.FC<TodosProps> = (props: TodosProps) => {
  const [isEdit, setIsEdit] = useState(false);

  function editTodoHandler() {
    setIsEdit(true);
  }

  const deleteHandler =
    (itemId: string) => (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      const listItem = event.currentTarget.parentElement?.parentElement;
      if (listItem) {
        listItem.remove();
      }

      console.log(itemId, event.currentTarget.parentElement);
    };

  return (
    <>
      {isEdit && <EditTodo />}
      <div>
        <button onClick={props.onShow} className={styles.itemButton}>
          Add New Todo
        </button>
      </div>

      <div className={styles.container}>
        <header>TODO LIST</header>
        <ul className={styles.list}>
          {props.items.map((item) => (
            <li className={styles.item} key={item.id}>
              <div>
                <input className={styles.checkbox} type="checkbox"></input>
                {item.text}
              </div>
              <div> {item.status}</div>
              <div>
                <button onClick={editTodoHandler} className={styles.itemButton}>
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
      </div>
    </>
  );
};

export default Todos;
