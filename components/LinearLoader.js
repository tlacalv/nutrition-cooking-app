import styles from '../styles/sass/components/loader.module.scss';

export default function LinearLoader() {
  return (
    <div class={styles.linear_activity}>
      <div class={styles.indeterminate}></div>
    </div>
  );
}
