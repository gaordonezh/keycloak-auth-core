// @ts-expect-error CSS IMPORT
import "./assets/main.css";

export { default as AuthenticationProvider } from "./components/AuthenticationContext";
export { useAuthentication, createKeycloakAxiosInstance } from "./components/AuthenticationContext";

export type { AuthenticationContextProps, AuthenticationProviderProps, KeycloakOptionsConfigProps } from "./types";
