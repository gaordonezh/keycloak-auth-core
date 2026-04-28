// @ts-expect-error CSS IMPORT
import "./assets/main.css";

export { default as KeycloakAuthenticationProvider } from "./components/AuthenticationContext";
export { useKeycloakAuthentication, createKeycloakAxiosInstance } from "./components/AuthenticationContext";
export { default as KeycloakLogin } from "./components/KeycloakLogin";

export type {
  KeycloakAuthenticationContextProps,
  KeycloakAuthenticationProviderProps,
  KeycloakOptionsConfigProps,
  KeycloakLoginProps,
} from "./types";
