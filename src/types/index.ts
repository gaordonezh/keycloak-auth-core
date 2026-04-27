import type { PropsWithChildren } from "react";
import type { GenericOidcConfig, KeycloakServerConfig, KeycloakTokenParsed } from "keycloak-js";

export interface KeycloakAuthenticationContextProps {
  loadingAuthentication: boolean;
  keycloakUser: KeycloakTokenParsed;
  handleLogout: VoidFunction;
  handleLogin: VoidFunction;
}

export type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export interface KeycloakAuthenticationProviderProps extends PropsWithChildren {
  options: KeycloakOptionsConfigProps;
  accessName: string;
  omitGlobalAuth: boolean;
  checkLoginIframe: boolean;
}
