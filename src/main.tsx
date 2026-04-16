import { createRoot } from "react-dom/client";
import App from "./demo/App";
// @ts-expect-error
import "./assets/main.css";

createRoot(document.getElementById("keycloak-auth-core-id")!).render(<App />);
