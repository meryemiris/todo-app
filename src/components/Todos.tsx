import styles from "./Todos.module.css";
import { useState } from "react";
import Todo from "../models/todo";
import EditTodo from "./EditTodo";

interface TodosProps {
  items: Todo[];
}

// const DUMMY_TODOS = ["Learn React", "Practice", "Find a Job"];

const Todos: React.FC<TodosProps> = (props: TodosProps) => {
  const [isEdit, setIsEdit] = useState(false);

  function editTodoHandler() {
    setIsEdit(true);
  }
  return (
    <>
      {isEdit && <EditTodo />}
      <div>
        <button className={styles.itemButton}>Add New Todo</button>
      </div>
      <div className={styles.container}>
        <header>TODO LIST</header>
        <ul className={styles.list}>
          {props.items.map((todo) => (
            <li className={styles.item} key={todo.id}>
              <div>
                <input className={styles.checkbox} type="checkbox"></input>
                {todo.text}
              </div>
              <div>
                {todo.status}
                <button onClick={editTodoHandler} className={styles.itemButton}>
                  edit
                </button>
                <button className={styles.itemButton}>delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
