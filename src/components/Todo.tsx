import styles from "./Todo.module.css";
import NewTodo from "./NewTodo";

const DUMMY_TODOS = [
  "Learn React",
  "Practice, Practice, Practice",
  "Find a Job",
];

export default function Todo() {
  return (
    <>
      <NewTodo />

      <div className={styles.container}>
        <header>TODO LIST</header>
        <ul className={styles.list}>
          {DUMMY_TODOS.map((item) => (
            <li className={styles.item} key={item}>
              <input className={styles.checkbox} type="checkbox"></input>
              {item}
              <div className={styles.itemButtons}>
                <button className={styles.itemButton}>edit</button>
                <button className={styles.itemButton}>delete</button>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
