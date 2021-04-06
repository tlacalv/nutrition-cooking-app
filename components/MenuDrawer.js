import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";
import {
  faEgg,
  faUtensils,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/sass/components/menu.module.scss";
import { useUI } from "../contexts/UIContext";
import { classList } from "../functions/index";

export default function MenuDrawer() {
  const { showMenu, setShowMenu } = useUI();
  const router = useRouter();

  const menuClasses = classList({
    [styles.menu]: true,
    [styles.show]: showMenu,
  });
  const overlayClasses = classList({
    [styles.overlay]: true,
    [styles.on]: showMenu,
  });

  return (
    <>
      <div className={menuClasses}>
        <div className={styles.logo}>
          <img src="/logo.svg"></img>
        </div>
        <ul className={styles.menu_nav}>
          <MenuItem
            link="/recipes"
            name="Recipes"
            active={router.pathname === "/recipes"}
            icon={<FontAwesomeIcon icon={faUtensils} />}
          />
          <MenuItem
            link="/ingredients"
            name="Ingredients"
            active={router.pathname === "/ingredients"}
            icon={<FontAwesomeIcon icon={faEgg} />}
          />
          <MenuItem
            link="/about"
            active={router.pathname === "/about"}
            name="About"
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
          />
        </ul>
      </div>
      <div onClick={() => setShowMenu(false)} className={overlayClasses}></div>
    </>
  );
}
