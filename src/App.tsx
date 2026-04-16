import { KeycloakConfig } from "keycloak-js";
import Home from "./components/Home";
import AuthenticationProvider from "./components/AuthenticationContext";

const appName = "CONTABLE-PRINCIPAL";
const keycloakOptions: KeycloakConfig = {
  url: "http://localhost:8081",
  realm: "contable",
  clientId: "contable-client-id",
};

const App = () => (
  <AuthenticationProvider appName={appName} options={keycloakOptions}>
    <Home />
  </AuthenticationProvider>
);

export default App;
