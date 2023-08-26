import styles from "./NewTodo.module.css";

interface NewTodoProps {
  onAdd: (status: string, text: string) => void;
  // onHideForm: () => void;
}

export default function NewTodo(props: NewTodoProps) {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;
    const todoStatus = data.get("status") as string;

    props.onAdd(todoStatus, todoText);

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

      <select name="status" id="status" defaultValue="none">
        <option value="none" selected disabled hidden>
          Select a Option
        </option>
        <option value="In process">In process</option>
        <option value="Done">Done</option>
      </select>

      <button
        // onClick={props.onHideForm}
        className={styles.formButton}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
