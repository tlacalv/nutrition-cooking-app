import MenuButton from "./MenuButton";
import styles from "../styles/sass/about.module.scss";

export default function Header(props) {
  return (
    <div className={styles.header}>
      <MenuButton />
      <h1 className={`md-26 ${styles.title}`}>{props.children}</h1>
    </div>
  )
}
