import Home from "./Home";
import AuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "http://localhost:8080",
  realm: "",
  clientId: "",
};

const App = () => (
  <AuthenticationProvider checkLoginIframe={false} omitGlobalAuth={false} accessName="access-contable-client" options={keycloakOptions}>
    <Home />
  </AuthenticationProvider>
);

export default App;
