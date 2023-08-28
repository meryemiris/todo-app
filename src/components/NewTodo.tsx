import Todo from "../models/todo";
import styles from "../styles/NewTodo.module.css";

interface NewTodoProps {
  items: Todo[];
  onAdd: (text: string) => void;
}

const NewTodo = ({ onAdd, items }: NewTodoProps) => {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const todoText = data.get("text") as string;

    onAdd(todoText);

    event.currentTarget.reset();
  }

  return (
    <form className={styles.inputGroup} onSubmit={submitHandler}>
      <input
        required
        id="text"
        name="text"
        placeholder="Enter your todo here..."
      ></input>

      <button type="submit" className={styles.addButton}>
        {items.length > 0 ? "Add" : "Add First Todo"}
      </button>
    </form>
  );
};

export default NewTodo;
