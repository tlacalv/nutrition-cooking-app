import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { useUI } from "../contexts/UIContext";

export default function MenuButton(props) {
  const { setShowMenu, showMenu } = useUI();
  return (
    <Button
      {...props}
      onClick={() => setShowMenu(!showMenu)}
      type="text"
      icon={
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: 24, color: "#777" }}
        />
      }
    />
  );
}
