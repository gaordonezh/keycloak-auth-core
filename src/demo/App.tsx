import Home from "./Home";
import AuthenticationProvider from "../components/AuthenticationContext";
import type { KeycloakOptionsConfigProps } from "../types";

const accessName = "";
const keycloakOptions: KeycloakOptionsConfigProps = {
  url: "https://sso.napcontable.com",
  realm: "",
  clientId: "",
};

const App = () => (
  <AuthenticationProvider checkLoginIframe={false} omitGlobalAuth={true} accessName={accessName} options={keycloakOptions}>
    <Home />
  </AuthenticationProvider>
);

export default App;
