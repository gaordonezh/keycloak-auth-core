import Home from "./Home";
import AuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = "access-contable-client";
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "http://localhost:8081",
  realm: "contable",
  clientId: "contable-client-id",
};

const App = () => (
  <AuthenticationProvider accessName={accessName} options={keycloakOptions}>
    <Home />
  </AuthenticationProvider>
);

export default App;
