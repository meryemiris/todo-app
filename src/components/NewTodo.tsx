import styles from "./NewTodo.module.css";

interface NewTodoProps {
  onAdd: (text: string) => void;
}

export default function NewTodo(props: NewTodoProps) {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;

    props.onAdd(todoText);
    event.currentTarget.reset();
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <label className={styles.formLabel} htmlFor="text">
        New Todo
      </label>
      <input
        required
        className={styles.formInput}
        type="text"
        id="text"
        name="text"
      ></input>

      <button className={styles.formButton} type="submit">
        Add
      </button>
    </form>
  );
}
