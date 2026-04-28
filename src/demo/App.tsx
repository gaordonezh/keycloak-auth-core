import Home from "./Home";
import KeycloakAuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = "";
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "",
  realm: "",
  clientId: "",
};

const App = () => (
  <KeycloakAuthenticationProvider
    omitGlobalAuth
    checkLoginIframe={false}
    accessName={accessName}
    options={keycloakOptions}
  >
    <Home />
  </KeycloakAuthenticationProvider>
);

export default App;
