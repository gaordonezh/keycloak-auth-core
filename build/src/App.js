import { jsx as _jsx } from "react/jsx-runtime";
import Home from "./components/Home";
import AuthenticationProvider from "./components/AuthenticationContext";
const appName = "CONTABLE-PRINCIPAL";
const keycloakOptions = {
    url: "http://localhost:8081",
    realm: "contable",
    clientId: "contable-client-id",
};
const App = () => (_jsx(AuthenticationProvider, { appName: appName, options: keycloakOptions, children: _jsx(Home, {}) }));
export default App;
