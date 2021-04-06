import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/sass/components/menubutton.module.scss";
import {useRouter} from 'next/router';

export default function BackButton(props) {
  const router = useRouter();
  return (
    <button
      className={styles.menu_button}
      {...props}
      onClick={() => router.back()}
    >
      <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
    </button>
  )
}
