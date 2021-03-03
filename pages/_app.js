import "fontsource-roboto";
import "antd/dist/antd.css";
import "../styles/index.css";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateRoute } from "../contexts/AuthContext";
import { UIProvider } from "../contexts/UIContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PrivateRoute>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </PrivateRoute>
    </AuthProvider>
  );
}
