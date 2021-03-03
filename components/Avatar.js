import { Avatar as AntAvatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

export default function Avatar() {
  return <AntAvatar icon={<FontAwesomeIcon icon={faUserAstronaut} />} />;
}
