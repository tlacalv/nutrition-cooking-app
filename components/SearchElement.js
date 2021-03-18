import styles from '../styles/recipes.module.css'

export default function SearchElement(props) {
  return (
    <li onClick={props.onClick} className={styles.search_element}>
      {props.name}
    </li>
  )
}
