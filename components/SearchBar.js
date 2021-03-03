import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import { Input } from "antd";

export default function SearchBar() {
  return (
    <Input
      size="large"
      placeholder="Search something"
      style={{ borderRadius: ".4rem" }}
      prefix={<MenuButton />}
      suffix={<Avatar />}
    />
  );
}
