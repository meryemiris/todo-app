import styles from "./NewTodo.module.css";

// interface EditProps {
//   onAdd: (status: string, text: string) => void;
// }

export default function EditTodo() {
  function editHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const todoText = data.get("text") as string;
    // const todoStatus = data.get("status") as string;

    // props.onEdit(todoStatus, todoText);
  }

  return (
    <form className={styles.container} onSubmit={editHandler}>
      <label className={styles.formLabel} htmlFor="text">
        Edit Todo
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
        Save
      </button>
    </form>
  );
}
