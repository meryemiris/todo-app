import styles from "./Start.module.css";

interface Headerprops {
  onShow: () => void;
}

export default function Header(props: Headerprops) {
  return (
    <>
      <div className={styles.start}>
        <h1 className={styles.catchPhrase}>
          Empower Your Productivity, One Task at a Time!
        </h1>
        <button className={styles.startButton} onClick={props.onShow}>
          Start
        </button>
      </div>
    </>
  );
}
