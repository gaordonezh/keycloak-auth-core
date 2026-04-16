import Home from "./Home";
import AuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const appName = "CONTABLE-PRINCIPAL";
const keycloakOptions: KeycloakOptionsConfigProps = {
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
