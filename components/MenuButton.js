import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../contexts/UIContext";
import styles from '../styles/sass/components/menubutton.module.scss';

export default function MenuButton(props) {
  const { setShowMenu, showMenu } = useUI();
  return (
    <button
    className={styles.menu_button}
      {...props}
      onClick={() => setShowMenu(!showMenu)}
    >
      <FontAwesomeIcon
          icon={faBars}
          className={styles.icon}
        />
    </button>
  );
}
