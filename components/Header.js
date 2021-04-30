import MenuButton from "./MenuButton";
import styles from "../styles/sass/components/searchbar.module.scss";
import aboutStyles from "../styles/sass/about.module.scss";

export default function Header(props) {
  return (
    <div className={styles.searchbar}>
      <MenuButton />
      <h1 className={`md-26 ${aboutStyles.title}`}>{props.children}</h1>
    </div>
  )
}
