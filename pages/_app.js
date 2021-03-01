import 'fontsource-roboto';
import 'antd/dist/antd.css'
import '../styles/index.css';
import {AuthProvider} from '../contexts/AuthContext'
import {PrivateRoute} from '../contexts/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PrivateRoute>
        <Component {...pageProps} />
      </PrivateRoute>
    </AuthProvider>
  )
}
