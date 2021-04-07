import styles from '../styles/sass/components/input.module.scss';
import {classList} from '../functions';

export default function Input(props) {
  const {small, label, placeholder} = props;
  const containerClasses = classList({
    [styles.input_container]: true,
    [styles.small]: small
  });
  const inputClasses = classList({
    [styles.input]: true,
    'rg-16': true,
    [styles.small_input]: small
  });
  const labelClasses = classList({
    'rg-16': true,
    [styles.label]: true,
    [styles.small_label]: small
  });
  return ( 
    <div tabIndex="0" className={containerClasses}>

      <label>
        <input className={inputClasses } placeholder={placeholder} />
        <span  className={labelClasses}>{label}</span>
      </label>
    </div>
  );
}
