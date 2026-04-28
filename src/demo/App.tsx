import Home from "./Home";
import KeycloakAuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = "access-sso-auth-front";
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "https://sso.napcontable.com",
  realm: "contable",
  clientId: "sso-auth-front-clientid",
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
