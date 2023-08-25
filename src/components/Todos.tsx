import styles from "./Todos.module.css";
import { useState } from "react";
import Todo from "../models/todo";
import EditTodo from "./EditTodo";

interface TodosProps {
  items: Todo[];
  onShow: () => void;
}

const Todos: React.FC<TodosProps> = (props: TodosProps) => {
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
              <div>{item.status}</div>
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
      </div>
    </>
  );
};

export default Todos;
