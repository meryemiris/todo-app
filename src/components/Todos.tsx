import styles from "./Todos.module.css";

import Todo from "../models/todo";

import TodoItem from "./TodoItem";

interface TodosProps {
  items: Todo[];
}

const Todos: React.FC<TodosProps> = (props: TodosProps) => {
  return (
    <>
      <div className={styles.container}>
        <header>TODO LIST</header>

        <TodoItem items={props.items} />
      </div>
    </>
  );
};

export default Todos;
