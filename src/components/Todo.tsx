import styles from "./Todo.module.css";
import NewTodoItem from "./NewTodoItem";

const DUMMY_TODOS = [
  "Learn React",
  "Practice, Practice, Practice",
  "Find a Job",
];

export default function Todo() {
  return (
    <>
      <NewTodoItem />
      <header>TODO LIST</header>
      <main className={styles.list}>
        <ul>
          {DUMMY_TODOS.map((item) => (
            <li className={styles.item} key={item}>
              {item}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
