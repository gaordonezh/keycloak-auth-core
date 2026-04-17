import type { PropsWithChildren } from "react";
import type { GenericOidcConfig, KeycloakServerConfig, KeycloakTokenParsed } from "keycloak-js";

export interface AuthenticationContextProps {
  handleLogout: VoidFunction;
  userInfo: KeycloakTokenParsed;
}

export type KeycloakOptionsConfigProps = KeycloakServerConfig & Pick<GenericOidcConfig, "clientId">;

export interface AuthenticationProviderProps extends PropsWithChildren {
  options: KeycloakOptionsConfigProps;
  accessName: string;
}
