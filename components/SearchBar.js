import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import { Input } from "antd";

export default function SearchBar(props) {
  return (
    <Input
      onChange={props.search}
      size="large"
      placeholder="Search something"
      style={{ borderRadius: ".4rem" }}
      prefix={<MenuButton />}
      suffix={<Avatar />}
    />
  );
}
