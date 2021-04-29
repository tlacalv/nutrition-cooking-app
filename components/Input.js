import styles from "../styles/sass/components/input.module.scss";
import { classList } from "../functions";
import { number } from "yup/lib/locale";

export default function Input({
  small,
  label,
  error,
  touched,
  type,
  whiteLabel,
  ...props
}) {
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
    [styles.small_label]: small,
    [styles.label_active]: (props.value !== ''),
    [styles.white]: whiteLabel
  });
  const handleChange = (e, cb) => {
    if (type === "number") {
      let value = e.target.value;
      if (isNaN(value)) return;
      if (e.target.value) e.target.value = parseInt(e.target.value, 10);
    }
    cb?.(e);
  };
  let inputType = (type === 'number')? 'text': type;
  return (
    <div className={containerClasses}>
      <label>
        <input
          {...props}
          type={inputType}
          onChange={(e) => handleChange(e, props.onChange)}
          className={inputClasses}
        />
        <span className={labelClasses}>{label}</span>
      </label>
      {error && touched ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}
