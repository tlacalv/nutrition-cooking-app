import styles from "../styles/sass/components/input.module.scss";
import { classList } from "../functions";
import {useState } from "react";

export default function Input(props) {
  const { small, label, placeholder, onchange } = props;
  const [value, setValue] = useState(props.value);

  const containerClasses = classList({
    [styles.input_container]: true,
    [styles.small]: small,
  });
  const inputClasses = classList({
    [styles.input]: true,
    "rg-16": true,
    [styles.small_input]: small,
  });
  const labelClasses = classList({
    "rg-16": true,
    [styles.label]: true,
    [styles.label_active]: !!value,
    [styles.small_label] : small,
  });
  const handleChange = (e)=> {
    
    setValue(e.target.value);
    onchange?.(e);
  }


  return (
    <div tabIndex="0" className={containerClasses}>
      <label>
        <input
          type={props.type}
          value={value}
          onChange={(e)=>handleChange(e)}
          className={inputClasses}
          placeholder={placeholder}
        />
        <span className={labelClasses}>{label}</span>
      </label>
    </div>
  );
}
