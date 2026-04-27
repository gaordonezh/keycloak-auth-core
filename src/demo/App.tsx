import Home from "./Home";
import KeycloakAuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = "";
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "https://sso.napcontable.com",
  realm: "",
  clientId: "",
};

const App = () => (
  <KeycloakAuthenticationProvider checkLoginIframe={false} omitGlobalAuth={true} accessName={accessName} options={keycloakOptions}>
    <Home />
  </KeycloakAuthenticationProvider>
);

export default App;
