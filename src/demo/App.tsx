import Home from "./Home";
import KeycloakAuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = 't'
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: '',
  realm: '',
  clientId: '',
}

const App = () => (
  <KeycloakAuthenticationProvider checkLoginIframe={false} omitGlobalAuth accessName={accessName} options={keycloakOptions}>
    <Home />
  </KeycloakAuthenticationProvider>
);

export default App;
