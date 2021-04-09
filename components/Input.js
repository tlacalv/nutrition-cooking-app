import styles from "../styles/sass/components/input.module.scss";
import { classList } from "../functions";

export default function Input({small, label, error, touched, ...props}) {
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
    [styles.label_active]: !!props.value,
    [styles.small_label] : small,
  });
  const handleChange = (e, cb)=> {
    cb?.(e)
  }

  return (
    <div className={containerClasses}>
      <label>
        <input
          {...props}
          onChange={(e)=>handleChange(e, props.onChange)}
          className={inputClasses}
        />
        <span className={labelClasses}>{label}</span>
      </label>
      {error && touched ? (<div className={styles.error}>{error}</div>):null}
    </div>
  );
}
