import Link from "next/link";
import { useRouter } from "next/router";
import { Layout as Antlayout, Menu, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEgg,
  faUtensils,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/layout.module.css";
import { useUI } from "../contexts/UIContext";

const { Sider } = Antlayout;

export default function MenuDrawer() {
  const { showMenu, setShowMenu } = useUI();
  const router = useRouter();

  const toggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Drawer
      title="Basic Drawer"
      placement="left"
      closable={false}
      onClose={toggle}
      headerStyle={{ display: "none" }}
      visible={showMenu}
      style={{ position: "absolute" }}
      bodyStyle={{ padding: 0 }}
    >
      <Sider className={styles.sider}>
        <div className={styles.logo}></div>
        <Menu mode="inline" selectedKeys={[router.pathname]}>
          <Menu.Item
            key="/recipes"
            icon={<FontAwesomeIcon icon={faUtensils} />}
          >
            <Link href="/recipes">Recipes</Link>
          </Menu.Item>
          <Menu.Item key="/ingredients" icon={<FontAwesomeIcon icon={faEgg} />}>
            <Link href="/ingredients">
              <a>Ingredients</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/about"
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
          >
            <Link href="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Drawer>
  );
}
