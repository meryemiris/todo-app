import styles from "./NewTodo.module.css";
import { useState } from "react";

interface EditProps {
  initialText: string;
  initialStatus: string;
  onEdit: (status: string, text: string) => void;
}

const EditTodo: React.FC<EditProps> = (props: EditProps) => {
  const [editedText, setEditedText] = useState(props.initialText);
  const [editedStatus, setEditedStatus] = useState(props.initialStatus);

  const editTodoHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onEdit(editedText, editedStatus);
  };

  return (
    <form className={styles.container} onSubmit={editTodoHandler}>
      <label className={styles.formLabel} htmlFor="text">
        Edit Todo
      </label>
      <input
        className={styles.formInput}
        type="text"
        id="text"
        name="text"
        value={editedText}
        onChange={(event) => setEditedText(event.target.value)}
      ></input>

      <select
        name="status"
        value={editedStatus}
        onChange={(event) => setEditedStatus(event.target.value)}
      >
        <option value="inprocess">In process</option>
        <option value="done">Done</option>
      </select>

      <button className={styles.formButton} type="submit">
        Save
      </button>
    </form>
  );
};

export default EditTodo;
