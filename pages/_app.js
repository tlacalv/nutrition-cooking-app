import 'fontsource-roboto';
import 'antd/dist/antd.css'
import '../styles/index.css';
import {useRouter} from 'next/router'
import {AuthProvider} from '../contexts/AuthContext'

export default function App({ Component, pageProps }) {
  const route = useRouter()
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
