import type { PropsWithChildren } from "react";
import type { GenericOidcConfig, KeycloakServerConfig, KeycloakTokenParsed } from "keycloak-js";

export interface AuthenticationContextProps {
  handleLogout: VoidFunction;
  userInfo: KeycloakTokenParsed;
  accessToken: string;
}

export type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export interface AuthenticationProviderProps extends PropsWithChildren {
  options: KeycloakOptionsConfigProps;
  appName: string;
}
