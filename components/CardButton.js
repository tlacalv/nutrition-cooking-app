
import styles from "../styles/sass/components/cardbutton.module.scss";

export default function CardButton(props) {
  return (
    <button
      className={styles.card_button}
      {...props}
    >
      {props.children}
    </button>
  )
}
