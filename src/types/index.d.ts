import { PropsWithChildren } from "react";
import { type KeycloakConfig, type KeycloakTokenParsed } from "keycloak-js";

export interface AuthenticationContextProps {
  handleLogout: VoidFunction;
  userInfo: KeycloakTokenParsed;
}

export interface AuthenticationProviderProps extends PropsWithChildren {
  options: KeycloakConfig;
  appName: string;
}
