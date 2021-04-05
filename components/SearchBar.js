import MenuButton from "./MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/sass/components/searchbar.module.scss';


export default function SearchBar(props) {
  return (
    <div className={styles.searchbar}>
      <MenuButton />
      <label htmlFor="search">
        <FontAwesomeIcon
            icon={faSearch}
            className={styles.icon}
          />
      </label>
      <input
        id="search"
        onChange={props.search}
        size="large"
        placeholder="Search something"
        className="rg-24"
      />

    </div>
  );
}
