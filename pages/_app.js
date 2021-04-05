import "fontsource-roboto";
import "../styles/custom-antd.css";
import "../styles/index.css";
import "../styles/index.scss";
import "../node_modules/normalize.css/normalize.css";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateRoute } from "../contexts/AuthContext";
import { UIProvider } from "../contexts/UIContext";
import { SWRConfig } from 'swr'
import fetchWithToken from '../utils/fetchWithToken'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PrivateRoute>
        <SWRConfig value={{fetcher: fetchWithToken}}>
          <UIProvider>
            <Component {...pageProps} />
          </UIProvider>
        </SWRConfig>
      </PrivateRoute>
    </AuthProvider>
  );
}
