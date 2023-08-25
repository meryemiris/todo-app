import styles from "./Todos.module.css";
import NewTodo from "./NewTodo";

const DUMMY_TODOS = ["Learn React", "Practice", "Find a Job"];

export default function Todo() {
  return (
    <>
      <NewTodo />

      <div className={styles.container}>
        <header>TODO LIST</header>
        <ul className={styles.list}>
          {DUMMY_TODOS.map((item) => (
            <li className={styles.item} key={item}>
              <div>
                <input className={styles.checkbox} type="checkbox"></input>
                {item}
              </div>
              <div>
                {"status"}
                <button className={styles.itemButton}>edit</button>
                <button className={styles.itemButton}>delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
