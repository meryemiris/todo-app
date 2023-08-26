import styles from "./Header.module.css";

interface Headerprops {
  onShow: () => void;
}

export default function Header(props: Headerprops) {
  return (
    <>
      {
        <div>
          <h1>Welcome</h1>
          <p>Start adding Todo!</p>
        </div>
      }
      <div>
        <button onClick={props.onShow} className={styles.button}>
          Add New Todo
        </button>
      </div>
    </>
  );
}
