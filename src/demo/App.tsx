import Home from "./Home";
import AuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "http://localhost:8081",
  realm: "contable",
  clientId: "contable-client-id",
};

const App = () => (
  <AuthenticationProvider omitGlobalAuth accessName="access-contable-client" options={keycloakOptions}>
    <Home />
  </AuthenticationProvider>
);

export default App;
