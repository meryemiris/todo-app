import styles from "./NewTodo.module.css";

import { useState } from "react";

interface NewTodoProps {
  onAdd: (text: string) => void;
}

const NewTodo = ({ onAdd }: NewTodoProps) => {
  const [isheader, setIsHeader] = useState(true);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;

    onAdd(todoText);
    setIsHeader(false);

    event.currentTarget.reset();
  }

  return (
    <>
      {isheader && (
        <h1 className={styles.catchPhrase}>
          Empower Your Productivity, One Task at a Time!
        </h1>
      )}
      <form className={styles.container} onSubmit={submitHandler}>
        <input
          required
          type="text"
          id="text"
          name="text"
          placeholder="Enter your todo here..."
        ></input>

        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>
    </>
  );
};

export default NewTodo;
