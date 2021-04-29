import styles from '../styles/sass/recipe.module.scss'

export default function SearchElement(props) {
  return (
    <li onClick={props.onClick} className={styles.search_element}>
      {props.name}
    </li>
  )
}
