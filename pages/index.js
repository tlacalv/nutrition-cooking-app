import styles from '../styles/sass/landing.module.scss';
import Button from '../components/Button';
import Image from 'next/image';
import Head from 'next/head';
import {useRouter} from 'next/router';

export default function HomePage() {
  const router = useRouter();
  return (
    <div className={styles.bg}>
      <Head>
        <title>Nutrition cooking</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image src="/logo-vertical.svg" width={200} height={200} />
        </div>
        <div className={styles.buttons}>
          <Button onClick={()=>router.push('/login')} >Log In</Button>
          <Button onClick={()=>router.push('/signup')} >Sign Up</Button>
        </div>
      </div>
    </div>
    )
}