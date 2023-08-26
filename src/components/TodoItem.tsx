import styles from "./TodoItem.module.css";
import Todo from "../models/todo";

interface TodoItemProps {
  items: Todo[];
}

const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps) => {
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
      <ul className={styles.list}>
        {props.items.map((item) => (
          <li className={styles.item} key={item.id}>
            <div>
              <input className={styles.checkbox} type="checkbox"></input>
              {item.status}

              {item.text}
            </div>

            <div>
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
