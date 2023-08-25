import styles from "./NewTodo.module.css";

interface NewTodoProps {
  onAdd: (status: string, text: string) => void;
}

export default function NewTodo(props: NewTodoProps) {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;
    const todoStatus = data.get("status") as string;

    console.log(todoText, todoStatus);
    props.onAdd(todoStatus, todoText);
    event.currentTarget.reset();
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <label className={styles.formLabel} htmlFor="text">
        New Todo
      </label>
      <input
        className={styles.formInput}
        type="text"
        id="text"
        name="text"
      ></input>

      <select name="status">
        <option value="inprocess">In process</option>
        <option value="done">Done</option>
      </select>

      <button className={styles.formButton} type="submit">
        Add
      </button>
    </form>
  );
}
