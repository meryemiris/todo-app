import styles from "./Todos.module.css";

import Todo from "../models/todo";

import TodoItem from "./TodoItem";

interface TodosProps {
  items: Todo[];
  onShow: () => void;
}

const Todos: React.FC<TodosProps> = (props: TodosProps) => {
  return (
    <>
      <div>
        <button onClick={props.onShow} className={styles.itemButton}>
          Add New Todo
        </button>
      </div>

      <div className={styles.container}>
        <header>TODO LIST</header>

        <TodoItem items={props.items} onShow={props.onShow} />
      </div>
    </>
  );
};

export default Todos;
